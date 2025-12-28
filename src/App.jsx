import { useState, useMemo, useEffect, useRef } from 'react'
import hardwareData from '../hardware.json'

// Components
import Header from './components/Header'
import {
    SearchIcon, CloseIcon, ArrowIcon, ZapIcon, CpuIcon, GpuIcon,
    ExternalLinkIcon, BookIcon, ClockIcon, DownloadIcon, LightbulbIcon,
    SortAscIcon, SortDescIcon, WrenchIcon, MapIcon, ListIcon, ChartIcon
} from './components/Icons'

// Guides
import {
    MsiAfterburner, RyzenMaster, IntelXtu, BiosBasics,
    OcGpu, OcCpuAmd, OcCpuIntel, OcRam,
    HwInfo, CpuZ, GpuZ, Cinebench, ThreeDMark, UnigineHeaven,
    Prime95, Occt, FurMark,
    FirstOc, Undervolting, Thermal, Stability
} from './guides'

// Pages
import Glossary from './pages/Glossary'
import GettingStarted from './pages/GettingStarted'
import HardwareDetail from './pages/HardwareDetail'
import HardwareComparator from './pages/HardwareComparator'

// =====================================================
// CUSTOM HOOKS
// =====================================================

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

// =====================================================
// HARDWARE CARD
// =====================================================

const HardwareCard = ({ hardware, onClick, index, onCompare, isInCompare }) => {
    const cardRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const difficultyClass = hardware.dificuldade?.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'medio'

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        if (cardRef.current) {
            observer.observe(cardRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleCompare = (e) => {
        e.stopPropagation()
        if (onCompare) onCompare(hardware)
    }

    return (
        <div
            ref={cardRef}
            className={`card card-clickable hardware-card ${isVisible ? 'card-visible' : ''}`}
            style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
            onClick={onClick}
        >
            <div className="hardware-card-header">
                <div>
                    <div className="hardware-card-title">{hardware.modelo}</div>
                    <div className="hardware-card-arch">{hardware.arquitetura}</div>
                </div>
                <span className={`badge badge-${hardware.tipo?.toLowerCase()}`}>
                    {hardware.tipo}
                </span>
            </div>

            <div className="hardware-card-specs">
                <div className="spec-item">
                    <div className="spec-label">Clock Base</div>
                    <div className="spec-value">{hardware.specs_stock?.clock_base || 'N/A'}</div>
                </div>
                <div className="spec-item">
                    <div className="spec-label">Clock Boost</div>
                    <div className="spec-value">{hardware.specs_stock?.clock_boost || 'N/A'}</div>
                </div>
                <div className="spec-item">
                    <div className="spec-label">{hardware.tipo === 'CPU' ? 'Cores/Threads' : 'VRAM'}</div>
                    <div className="spec-value">
                        {hardware.tipo === 'CPU'
                            ? hardware.specs_stock?.nucleos_threads
                            : hardware.specs_stock?.vram || 'N/A'}
                    </div>
                </div>
                <div className="spec-item">
                    <div className="spec-label">TDP</div>
                    <div className="spec-value">{hardware.specs_stock?.tdp || 'N/A'}</div>
                </div>
            </div>

            <div className="hardware-card-footer">
                <div className="hardware-card-gain">
                    <span className="label">Ganho OC: </span>
                    <span className="value">{hardware.specs_oc_recomendado?.ganho_estimado || 'N/A'}</span>
                </div>
                <div className="hardware-card-actions">
                    {onCompare && (
                        <button
                            className={`compare-btn ${isInCompare ? 'added' : ''}`}
                            onClick={handleCompare}
                            title={isInCompare ? 'Remover da comparação' : 'Adicionar à comparação'}
                        >
                            {isInCompare ? '✓' : '+'}
                        </button>
                    )}
                    <span className={`badge badge-difficulty-${difficultyClass}`}>
                        {hardware.dificuldade}
                    </span>
                </div>
            </div>
        </div>
    )
}

// =====================================================
// HARDWARE MODAL - Improved Design
// =====================================================

const HardwareModal = ({ hardware, onClose, setView }) => {
    if (!hardware) return null

    const guiaUrl = hardware.configuracao_software?.guia_url
    let targetView = null
    let ocGuideView = null

    if (guiaUrl) {
        if (guiaUrl.includes('msi-afterburner')) targetView = 'guide-msi'
        else if (guiaUrl.includes('ryzen-master')) targetView = 'guide-ryzen'
        else if (guiaUrl.includes('intel-xtu')) targetView = 'guide-intel-xtu'
        else if (guiaUrl.includes('bios')) targetView = 'guide-bios'
    }

    // Determine OC guide based on hardware type
    if (hardware.tipo === 'GPU') {
        ocGuideView = 'guide-oc-gpu'
    } else if (hardware.tipo === 'CPU') {
        if (hardware.marca === 'AMD') ocGuideView = 'guide-oc-cpu-amd'
        else if (hardware.marca === 'Intel') ocGuideView = 'guide-oc-cpu-intel'
    }

    const handleGuideClick = (view) => {
        if (view) {
            setView(view)
            onClose()
        }
    }

    // Export configuration to file
    const exportConfig = (format) => {
        const config = {
            hardware: {
                marca: hardware.marca,
                modelo: hardware.modelo,
                tipo: hardware.tipo,
                arquitetura: hardware.arquitetura
            },
            specs_stock: hardware.specs_stock,
            specs_oc: hardware.specs_oc_recomendado,
            software: hardware.configuracao_software?.programa_nome,
            ajustes: hardware.configuracao_software?.ajustes,
            dica: hardware.dica_mestre
        }

        let content, filename, mimeType

        if (format === 'json') {
            content = JSON.stringify(config, null, 2)
            filename = `${hardware.modelo.replace(/\s+/g, '_')}_OC_Config.json`
            mimeType = 'application/json'
        } else {
            // TXT format
            let txt = `═══════════════════════════════════════════════\n`
            txt += `  SILICON REDLINE - Configuração de Overclock\n`
            txt += `═══════════════════════════════════════════════\n\n`
            txt += `HARDWARE: ${hardware.marca} ${hardware.modelo}\n`
            txt += `TIPO: ${hardware.tipo} | ARQ: ${hardware.arquitetura}\n`
            txt += `DIFICULDADE: ${hardware.dificuldade}\n\n`

            txt += `───────────────────────────────────────────────\n`
            txt += `  SPECS STOCK\n`
            txt += `───────────────────────────────────────────────\n`
            if (hardware.specs_stock) {
                Object.entries(hardware.specs_stock).forEach(([key, val]) => {
                    txt += `  ${key}: ${val}\n`
                })
            }

            txt += `\n───────────────────────────────────────────────\n`
            txt += `  CONFIGURAÇÃO OC RECOMENDADA\n`
            txt += `───────────────────────────────────────────────\n`
            if (hardware.specs_oc_recomendado) {
                Object.entries(hardware.specs_oc_recomendado).forEach(([key, val]) => {
                    txt += `  ${key}: ${val}\n`
                })
            }

            txt += `\n───────────────────────────────────────────────\n`
            txt += `  AJUSTES NO ${hardware.configuracao_software?.programa_nome || 'SOFTWARE'}\n`
            txt += `───────────────────────────────────────────────\n`
            hardware.configuracao_software?.ajustes?.forEach(a => {
                txt += `  ${a.campo}: ${a.valor}\n`
            })

            if (hardware.dica_mestre) {
                txt += `\n───────────────────────────────────────────────\n`
                txt += `  DICA DO MESTRE\n`
                txt += `───────────────────────────────────────────────\n`
                txt += `  ${hardware.dica_mestre}\n`
            }

            txt += `\n═══════════════════════════════════════════════\n`
            txt += `  Gerado por Silicon Redline | siliconredline.com\n`
            txt += `═══════════════════════════════════════════════\n`

            content = txt
            filename = `${hardware.modelo.replace(/\s+/g, '_')}_OC_Config.txt`
            mimeType = 'text/plain'
        }

        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
    }

    const difficultyClass = hardware.dificuldade?.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'medio'

    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose()
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleEsc)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleEsc)
        }
    }, [onClose])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="hw-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="hw-modal-header">
                    <div className="hw-modal-header-top">
                        <span className={`badge badge-${hardware.tipo?.toLowerCase()}`}>
                            {hardware.tipo}
                        </span>
                        <span className={`badge badge-difficulty-${difficultyClass}`}>
                            {hardware.dificuldade}
                        </span>
                        <button className="modal-close" onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>
                    <h2 className="hw-modal-title">{hardware.modelo}</h2>
                    <div className="hw-modal-meta">
                        <span className="hw-modal-brand">{hardware.marca}</span>
                        <span className="hw-modal-divider">•</span>
                        <span className="hw-modal-arch">{hardware.arquitetura}</span>
                    </div>
                </div>

                <div className="hw-modal-body">
                    {/* Quick Stats */}
                    <div className="hw-modal-stats">
                        <div className="hw-stat">
                            <div className="hw-stat-label">Clock Base</div>
                            <div className="hw-stat-value">{hardware.specs_stock?.clock_base || 'N/A'}</div>
                        </div>
                        <div className="hw-stat">
                            <div className="hw-stat-label">Clock Boost</div>
                            <div className="hw-stat-value">{hardware.specs_stock?.clock_boost || 'N/A'}</div>
                        </div>
                        <div className="hw-stat">
                            <div className="hw-stat-label">{hardware.tipo === 'CPU' ? 'Cores' : 'VRAM'}</div>
                            <div className="hw-stat-value">
                                {hardware.tipo === 'CPU'
                                    ? hardware.specs_stock?.nucleos_threads
                                    : hardware.specs_stock?.vram || 'N/A'}
                            </div>
                        </div>
                        <div className="hw-stat">
                            <div className="hw-stat-label">TDP</div>
                            <div className="hw-stat-value">{hardware.specs_stock?.tdp || 'N/A'}</div>
                        </div>
                    </div>

                    {/* OC Comparison */}
                    <div className="hw-modal-section">
                        <h3 className="hw-section-title">
                            <ZapIcon /> Overclock Recomendado
                        </h3>
                        <div className="hw-comparison">
                            <div className="hw-compare-col hw-compare-stock">
                                <div className="hw-compare-header">Stock</div>
                                <div className="hw-compare-item">
                                    <span>Clock</span>
                                    <span>{hardware.specs_stock?.clock_boost || 'N/A'}</span>
                                </div>
                                <div className="hw-compare-item">
                                    <span>Voltagem</span>
                                    <span>Auto</span>
                                </div>
                                <div className="hw-compare-item">
                                    <span>Temp Máx</span>
                                    <span>-</span>
                                </div>
                            </div>
                            <div className="hw-compare-arrow">
                                <ArrowIcon />
                            </div>
                            <div className="hw-compare-col hw-compare-oc">
                                <div className="hw-compare-header">OC Seguro</div>
                                <div className="hw-compare-item">
                                    <span>Clock</span>
                                    <span className="hw-value-oc">{hardware.specs_oc_recomendado?.clock_alvo || 'N/A'}</span>
                                </div>
                                <div className="hw-compare-item">
                                    <span>Voltagem</span>
                                    <span className="hw-value-oc">{hardware.specs_oc_recomendado?.voltagem_safe || 'N/A'}</span>
                                </div>
                                <div className="hw-compare-item">
                                    <span>Temp Máx</span>
                                    <span className="hw-value-oc">{hardware.specs_oc_recomendado?.temp_max_alvo || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="hw-gain-badge">
                            Ganho Esperado: <span>{hardware.specs_oc_recomendado?.ganho_estimado || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Software Config */}
                    <div className="hw-modal-section">
                        <h3 className="hw-section-title">
                            <DownloadIcon /> Configuração no {hardware.configuracao_software?.programa_nome || 'Software'}
                        </h3>
                        <div className="hw-config-grid">
                            {hardware.configuracao_software?.ajustes?.map((ajuste, idx) => (
                                <div key={idx} className="hw-config-item">
                                    <span className="hw-config-field">{ajuste.campo}</span>
                                    <span className="hw-config-value">{ajuste.valor}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    {hardware.dica_mestre && (
                        <div className="hw-tip">
                            <div className="hw-tip-icon">
                                <LightbulbIcon />
                            </div>
                            <div className="hw-tip-content">
                                <div className="hw-tip-title">Dica do Mestre</div>
                                <p>{hardware.dica_mestre}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="hw-modal-footer">
                    <div className="hw-export-group">
                        <button
                            className="btn btn-outline"
                            onClick={() => exportConfig('txt')}
                            title="Exportar como TXT"
                        >
                            <DownloadIcon /> TXT
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => exportConfig('json')}
                            title="Exportar como JSON"
                        >
                            <DownloadIcon /> JSON
                        </button>
                    </div>
                    <div className="hw-guide-group">
                        {targetView && (
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleGuideClick(targetView)}
                            >
                                <BookIcon /> Guia {hardware.configuracao_software?.programa_nome}
                            </button>
                        )}
                        {ocGuideView && (
                            <button
                                className="btn btn-primary"
                                onClick={() => handleGuideClick(ocGuideView)}
                            >
                                <ZapIcon /> Ver Guia de OC
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// =====================================================
// HERO SECTION
// =====================================================

const HeroSection = ({ cpuCount, gpuCount, totalCount }) => (
    <div className="hero">
        <div className="hero-badge">
            <ZapIcon /> Base de Dados de Overclock
        </div>
        <h1 className="hero-title">
            SILICON <span>REDLINE</span>
        </h1>
        <p className="hero-subtitle">
            Configurações de overclock seguras e testadas para CPUs e GPUs.
            Desbloqueia o máximo desempenho do teu hardware.
        </p>

        <div className="hero-stats">
            <div className="hero-stat">
                <div className="hero-stat-icon"><CpuIcon /></div>
                <div className="hero-stat-content">
                    <span className="hero-stat-value">{cpuCount}</span>
                    <span className="hero-stat-label">CPUs</span>
                </div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
                <div className="hero-stat-icon infrared"><GpuIcon /></div>
                <div className="hero-stat-content">
                    <span className="hero-stat-value">{gpuCount}</span>
                    <span className="hero-stat-label">GPUs</span>
                </div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
                <div className="hero-stat-icon cyan"><ZapIcon /></div>
                <div className="hero-stat-content">
                    <span className="hero-stat-value">{totalCount}</span>
                    <span className="hero-stat-label">Configs</span>
                </div>
            </div>
        </div>
    </div>
)

// =====================================================
// HOME VIEW
// =====================================================

const HomeView = ({ hardwareDatabase, setSelectedHardware, onCompare, isInCompare }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [brandFilter, setBrandFilter] = useState('all')
    const [difficultyFilter, setDifficultyFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')

    const debouncedSearch = useDebounce(searchQuery, 300)

    const cpuCount = hardwareDatabase.filter(h => h.tipo === 'CPU').length
    const gpuCount = hardwareDatabase.filter(h => h.tipo === 'GPU').length

    const brands = useMemo(() => {
        const brandSet = new Set(hardwareDatabase.map(hw => hw.marca).filter(Boolean))
        return Array.from(brandSet).sort()
    }, [hardwareDatabase])

    const filteredHardware = useMemo(() => {
        let result = hardwareDatabase.filter(hw => {
            const matchesSearch = !debouncedSearch ||
                hw.modelo?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                hw.marca?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                hw.arquitetura?.toLowerCase().includes(debouncedSearch.toLowerCase())

            const matchesType = typeFilter === 'all' || hw.tipo?.toLowerCase() === typeFilter.toLowerCase()
            const matchesBrand = brandFilter === 'all' || hw.marca === brandFilter
            const matchesDifficulty = difficultyFilter === 'all' ||
                hw.dificuldade?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === difficultyFilter

            return matchesSearch && matchesType && matchesBrand && matchesDifficulty
        })

        result.sort((a, b) => {
            let comparison = 0
            switch (sortBy) {
                case 'name':
                    comparison = (a.modelo || '').localeCompare(b.modelo || '')
                    break
                case 'gain':
                    const gainA = parseFloat(a.specs_oc_recomendado?.ganho_estimado?.match(/\d+/)?.[0] || 0)
                    const gainB = parseFloat(b.specs_oc_recomendado?.ganho_estimado?.match(/\d+/)?.[0] || 0)
                    comparison = gainB - gainA
                    break
                case 'difficulty':
                    const diffOrder = { iniciante: 1, medio: 2, avancado: 3 }
                    const diffA = diffOrder[a.dificuldade?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')] || 2
                    const diffB = diffOrder[b.dificuldade?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')] || 2
                    comparison = diffA - diffB
                    break
            }
            return sortDirection === 'asc' ? comparison : -comparison
        })

        return result
    }, [hardwareDatabase, debouncedSearch, typeFilter, brandFilter, difficultyFilter, sortBy, sortDirection])

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortDirection('asc')
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setTypeFilter('all')
        setBrandFilter('all')
        setDifficultyFilter('all')
    }

    const hasActiveFilters = typeFilter !== 'all' || brandFilter !== 'all' || difficultyFilter !== 'all' || searchQuery

    return (
        <>
            <HeroSection cpuCount={cpuCount} gpuCount={gpuCount} totalCount={hardwareDatabase.length} />

            <div className="filters-section">
                <div className="filters-row">
                    <div className="search-input-wrapper" style={{ flex: 1 }}>
                        <span className="search-icon"><SearchIcon /></span>
                        <input
                            type="text"
                            className="input-tactical"
                            placeholder="Pesquisar hardware... (ex: RTX 4090, Ryzen 9)"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filters-row">
                    <span className="filter-label">Tipo:</span>
                    <div className="filter-group">
                        <button className={`filter-chip ${typeFilter === 'all' ? 'active' : ''}`} onClick={() => setTypeFilter('all')}>Todos</button>
                        <button className={`filter-chip ${typeFilter === 'cpu' ? 'active' : ''}`} onClick={() => setTypeFilter('cpu')}>CPU</button>
                        <button className={`filter-chip ${typeFilter === 'gpu' ? 'active' : ''}`} onClick={() => setTypeFilter('gpu')}>GPU</button>
                    </div>

                    <span className="filter-label">Marca:</span>
                    <select className="select-tactical" value={brandFilter} onChange={e => setBrandFilter(e.target.value)}>
                        <option value="all">Todas</option>
                        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>

                    <span className="filter-label">Dificuldade:</span>
                    <select className="select-tactical" value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)}>
                        <option value="all">Todas</option>
                        <option value="iniciante">Iniciante</option>
                        <option value="medio">Médio</option>
                        <option value="avancado">Avançado</option>
                    </select>

                    {hasActiveFilters && (
                        <button className="clear-filters-btn" onClick={clearFilters}>Limpar</button>
                    )}
                </div>

                <div className="filters-row">
                    <span className="filter-label">Ordenar:</span>
                    <div className="sort-group">
                        <button className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`} onClick={() => toggleSort('name')}>
                            Nome {sortBy === 'name' && (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />)}
                        </button>
                        <button className={`sort-btn ${sortBy === 'gain' ? 'active' : ''}`} onClick={() => toggleSort('gain')}>
                            Ganho OC {sortBy === 'gain' && (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />)}
                        </button>
                        <button className={`sort-btn ${sortBy === 'difficulty' ? 'active' : ''}`} onClick={() => toggleSort('difficulty')}>
                            Dificuldade {sortBy === 'difficulty' && (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />)}
                        </button>
                    </div>
                </div>
            </div>

            <div className="results-count">
                A mostrar <span>{filteredHardware.length}</span> de {hardwareDatabase.length} itens
            </div>

            <div className="bento-grid">
                {filteredHardware.map((hw, index) => (
                    <HardwareCard
                        key={hw.id}
                        hardware={hw}
                        onClick={() => setSelectedHardware(hw)}
                        index={index}
                        onCompare={onCompare}
                        isInCompare={isInCompare ? isInCompare(hw.id) : false}
                    />
                ))}
            </div>

            {filteredHardware.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon"><SearchIcon /></div>
                    <div className="empty-state-title">Nenhum resultado encontrado</div>
                    <p className="empty-state-text">Tenta ajustar os filtros ou pesquisar por outro termo.</p>
                </div>
            )}
        </>
    )
}

// =====================================================
// TOOLS VIEW
// =====================================================

const TOOLS = [
    { name: 'MSI Afterburner', desc: 'Overclock de GPUs NVIDIA e AMD', cat: 'OC', url: 'https://www.msi.com/Landing/afterburner/graphics-cards' },
    { name: 'AMD Ryzen Master', desc: 'Overclock de CPUs AMD Ryzen', cat: 'OC', url: 'https://www.amd.com/en/technologies/ryzen-master' },
    { name: 'Intel XTU', desc: 'Overclock de CPUs Intel K/KF', cat: 'OC', url: 'https://www.intel.com/content/www/us/en/download/17881/intel-extreme-tuning-utility-intel-xtu.html' },
    { name: 'HWiNFO64', desc: 'Temperaturas, voltagens e sensores', cat: 'MON', url: 'https://www.hwinfo.com/download/' },
    { name: 'CPU-Z', desc: 'Info detalhada CPU/RAM/MB', cat: 'MON', url: 'https://www.cpuid.com/softwares/cpu-z.html' },
    { name: 'GPU-Z', desc: 'Info detalhada da GPU', cat: 'MON', url: 'https://www.techpowerup.com/gpuz/' },
    { name: 'Cinebench R23', desc: 'Benchmark CPU multi/single', cat: 'BENCH', url: 'https://www.maxon.net/en/cinebench' },
    { name: '3DMark', desc: 'Benchmark GPU completo', cat: 'BENCH', url: 'https://www.3dmark.com/' },
    { name: 'Unigine Heaven', desc: 'Benchmark GPU gratuito', cat: 'BENCH', url: 'https://benchmark.unigine.com/heaven' },
    { name: 'Prime95', desc: 'Stress test CPU rigoroso', cat: 'STRESS', url: 'https://www.mersenne.org/download/' },
    { name: 'OCCT', desc: 'Stress test CPU/GPU/PSU', cat: 'STRESS', url: 'https://www.ocbase.com/' },
    { name: 'FurMark', desc: 'Stress test GPU térmico', cat: 'STRESS', url: 'https://geeks3d.com/furmark/' },
]

const getCatColor = (cat) => {
    switch (cat) {
        case 'OC': return 'infrared'
        case 'MON': return 'cyan'
        case 'BENCH': return 'green'
        case 'STRESS': return 'yellow'
        default: return 'cyan'
    }
}

const getCatLabel = (cat) => {
    switch (cat) {
        case 'OC': return 'Overclock'
        case 'MON': return 'Monitor'
        case 'BENCH': return 'Benchmark'
        case 'STRESS': return 'Stress Test'
        default: return cat
    }
}

const ToolsView = () => {
    const [catFilter, setCatFilter] = useState('all')

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'OC', label: 'Overclock' },
        { id: 'MON', label: 'Monitorização' },
        { id: 'BENCH', label: 'Benchmark' },
        { id: 'STRESS', label: 'Stress Test' },
    ]

    const filteredTools = catFilter === 'all'
        ? TOOLS
        : TOOLS.filter(t => t.cat === catFilter)

    return (
        <>
            <div className="tools-hero">
                <WrenchIcon />
                <h1 className="page-title">FERRAMENTAS <span>ESSENCIAIS</span></h1>
                <p className="page-subtitle">
                    Software gratuito para overclock, monitorização e teste de estabilidade.
                </p>
            </div>

            <div className="tools-filters">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`tools-filter-btn ${catFilter === cat.id ? 'active' : ''}`}
                        onClick={() => setCatFilter(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="tools-grid-compact">
                {filteredTools.map((tool, idx) => (
                    <a key={idx} href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-card-compact">
                        <div className="tool-card-top">
                            <span className={`tool-badge tool-badge-${getCatColor(tool.cat)}`}>{getCatLabel(tool.cat)}</span>
                            <ExternalLinkIcon />
                        </div>
                        <div className="tool-card-name">{tool.name}</div>
                        <div className="tool-card-desc">{tool.desc}</div>
                    </a>
                ))}
            </div>

            <div className="tools-footer">
                <p>Todos os downloads são das fontes oficiais.</p>
            </div>
        </>
    )
}

// =====================================================
// GUIDES HUB
// =====================================================

const GUIDES_DATA = {
    toolTutorials: {
        title: 'Tutoriais de Ferramentas',
        description: 'Aprende a usar todos os programas essenciais para overclock',
        icon: 'tools',
        guides: [
            // Overclock Tools
            { id: 'guide-msi', title: 'MSI Afterburner', desc: 'Overclock de GPUs NVIDIA e AMD', difficulty: 'Iniciante', time: '10 min' },
            { id: 'guide-ryzen', title: 'AMD Ryzen Master', desc: 'Overclock e PBO para Ryzen', difficulty: 'Médio', time: '15 min' },
            { id: 'guide-intel-xtu', title: 'Intel XTU', desc: 'Overclock de CPUs Intel K/KF', difficulty: 'Médio', time: '15 min' },
            // Monitoring
            { id: 'guide-hwinfo', title: 'HWiNFO64', desc: 'Monitorização completa de sensores', difficulty: 'Iniciante', time: '10 min' },
            { id: 'guide-cpuz', title: 'CPU-Z', desc: 'Informação detalhada do CPU e RAM', difficulty: 'Iniciante', time: '6 min' },
            { id: 'guide-gpuz', title: 'GPU-Z', desc: 'Specs e sensores da placa gráfica', difficulty: 'Iniciante', time: '6 min' },
            // Benchmarks
            { id: 'guide-cinebench', title: 'Cinebench R23', desc: 'Benchmark de CPU single e multi-core', difficulty: 'Iniciante', time: '7 min' },
            { id: 'guide-3dmark', title: '3DMark', desc: 'O benchmark de gaming mais popular', difficulty: 'Iniciante', time: '8 min' },
            { id: 'guide-unigine', title: 'Unigine Heaven', desc: 'Benchmark gratuito de GPU', difficulty: 'Iniciante', time: '6 min' },
            // Stress Tests
            { id: 'guide-prime95', title: 'Prime95', desc: 'Stress test intensivo de CPU', difficulty: 'Médio', time: '12 min' },
            { id: 'guide-occt', title: 'OCCT', desc: 'Suite completa de stress testing', difficulty: 'Médio', time: '12 min' },
            { id: 'guide-furmark', title: 'FurMark', desc: 'Stress test térmico de GPU', difficulty: 'Iniciante', time: '8 min' },
        ]
    },
    overclockGuides: {
        title: 'Guias de Overclock',
        description: 'Metodologias e técnicas para cada tipo de hardware',
        icon: 'zap',
        guides: [
            // Getting Started
            { id: 'guide-first-oc', title: 'Primeiro Overclock', desc: 'Guia para iniciantes - por onde começar', difficulty: 'Iniciante', time: '15 min' },
            { id: 'guide-bios', title: 'BIOS para Overclock', desc: 'Configurações essenciais de BIOS/UEFI', difficulty: 'Iniciante', time: '10 min' },
            // Hardware specific
            { id: 'guide-oc-gpu', title: 'Overclock de GPU', desc: 'Metodologia completa para placas gráficas', difficulty: 'Médio', time: '20 min' },
            { id: 'guide-oc-cpu-amd', title: 'Overclock CPU AMD', desc: 'PBO, Curve Optimizer e OC manual', difficulty: 'Avançado', time: '25 min' },
            { id: 'guide-oc-cpu-intel', title: 'Overclock CPU Intel', desc: 'Ratio, voltagem e configuração', difficulty: 'Avançado', time: '25 min' },
            { id: 'guide-oc-ram', title: 'Overclock de RAM', desc: 'XMP, timings e frequency tuning', difficulty: 'Avançado', time: '30 min' },
            // Advanced techniques
            { id: 'guide-undervolting', title: 'Undervolting', desc: 'Reduzir voltagem para menos calor e consumo', difficulty: 'Médio', time: '15 min' },
            { id: 'guide-thermal', title: 'Gestão Térmica', desc: 'Arrefecimento, pasta térmica e airflow', difficulty: 'Iniciante', time: '12 min' },
            { id: 'guide-stability', title: 'Testes de Estabilidade', desc: 'Como validar que o OC está estável', difficulty: 'Médio', time: '18 min' },
        ]
    },
}

const GuidesHub = ({ setView }) => {
    const getDifficultyColor = (diff) => {
        switch (diff.toLowerCase()) {
            case 'iniciante': return 'green'
            case 'médio': case 'medio': return 'yellow'
            case 'avançado': case 'avancado': return 'infrared'
            default: return 'cyan'
        }
    }

    const getCategoryIcon = (icon) => {
        switch (icon) {
            case 'tools': return <DownloadIcon />
            case 'zap': return <ZapIcon />
            case 'monitor': return <CpuIcon />
            case 'chart': return <ChartIcon />
            case 'fire': return <ZapIcon />
            default: return <LightbulbIcon />
        }
    }

    return (
        <>
            <div className="tools-hero">
                <MapIcon />
                <h1 className="page-title">GUIAS & <span>TUTORIAIS</span></h1>
                <p className="page-subtitle">
                    Aprende a fazer overclock de forma segura com guias passo-a-passo.
                </p>
            </div>

            <div className="guides-categories">
                {Object.entries(GUIDES_DATA).map(([key, category]) => (
                    <div key={key} className="guides-category">
                        <div className="guides-category-header">
                            <div className="guides-category-icon">{getCategoryIcon(category.icon)}</div>
                            <div>
                                <h2 className="guides-category-title">{category.title}</h2>
                                <p className="guides-category-desc">{category.description}</p>
                            </div>
                        </div>

                        <div className="guides-grid">
                            {category.guides.map((guide) => (
                                <div key={guide.id} className="guide-card" onClick={() => setView(guide.id)}>
                                    {guide.badge && (
                                        <span className={`guide-badge guide-badge-${guide.badge}`}>
                                            {guide.badge === 'popular' ? 'Popular' : 'Novo'}
                                        </span>
                                    )}
                                    <div className="guide-card-header">
                                        <span className={`guide-difficulty guide-difficulty-${getDifficultyColor(guide.difficulty)}`}>
                                            {guide.difficulty}
                                        </span>
                                        <span className="guide-time"><ClockIcon /> {guide.time}</span>
                                    </div>
                                    <h3 className="guide-card-title">{guide.title}</h3>
                                    <p className="guide-card-desc">{guide.desc}</p>
                                    <div className="guide-card-action">Ver Guia <ArrowIcon /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Glossary Banner */}
            <div className="glossary-banner" onClick={() => setView('glossary')}>
                <div className="glossary-banner-content">
                    <ListIcon />
                    <div>
                        <h3>Glossário de Overclock</h3>
                        <p>Mais de 200 termos técnicos explicados</p>
                    </div>
                </div>
                <div className="glossary-banner-action">
                    Ver Glossário <ArrowIcon />
                </div>
            </div>
        </>
    )
}

// =====================================================
// MAIN APP
// =====================================================

function App() {
    const [currentView, setCurrentView] = useState('home')
    const [selectedHardware, setSelectedHardware] = useState(null)
    const [compareItems, setCompareItems] = useState([])

    const hardwareDatabase = hardwareData

    // Compare functions
    const addToCompare = (item) => {
        if (compareItems.length < 2 && !compareItems.find(i => i.id === item.id)) {
            setCompareItems([...compareItems, item])
        }
    }
    const removeFromCompare = (id) => {
        setCompareItems(compareItems.filter(i => i.id !== id))
    }
    const clearCompare = () => setCompareItems([])
    const isInCompare = (id) => compareItems.some(i => i.id === id)

    // Go back to guides hub
    const goToGuides = () => setCurrentView('guides')

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <HomeView
                    hardwareDatabase={hardwareDatabase}
                    setSelectedHardware={setSelectedHardware}
                    onCompare={addToCompare}
                    isInCompare={isInCompare}
                />
            case 'tools':
                return <ToolsView />
            case 'guides':
                return <GuidesHub setView={setCurrentView} />
            // Program tutorials
            case 'guide-msi':
                return <MsiAfterburner onBack={goToGuides} />
            case 'guide-ryzen':
                return <RyzenMaster onBack={goToGuides} />
            case 'guide-intel-xtu':
                return <IntelXtu onBack={goToGuides} />
            case 'guide-bios':
                return <BiosBasics onBack={goToGuides} />
            // Monitoring tools
            case 'guide-hwinfo':
                return <HwInfo onBack={goToGuides} />
            case 'guide-cpuz':
                return <CpuZ onBack={goToGuides} />
            case 'guide-gpuz':
                return <GpuZ onBack={goToGuides} />
            // Benchmarks
            case 'guide-cinebench':
                return <Cinebench onBack={goToGuides} />
            case 'guide-3dmark':
                return <ThreeDMark onBack={goToGuides} />
            case 'guide-unigine':
                return <UnigineHeaven onBack={goToGuides} />
            // Stress tests
            case 'guide-prime95':
                return <Prime95 onBack={goToGuides} />
            case 'guide-occt':
                return <Occt onBack={goToGuides} />
            case 'guide-furmark':
                return <FurMark onBack={goToGuides} />
            // Overclock guides
            case 'guide-oc-gpu':
                return <OcGpu onBack={goToGuides} />
            case 'guide-oc-cpu-amd':
                return <OcCpuAmd onBack={goToGuides} />
            case 'guide-oc-cpu-intel':
                return <OcCpuIntel onBack={goToGuides} />
            case 'guide-oc-ram':
                return <OcRam onBack={goToGuides} />
            case 'guide-first-oc':
                return <FirstOc onBack={goToGuides} />
            case 'guide-undervolting':
                return <Undervolting onBack={goToGuides} />
            case 'guide-thermal':
                return <Thermal onBack={goToGuides} />
            case 'guide-stability':
                return <Stability onBack={goToGuides} />
            // Glossary
            case 'glossary':
                return <Glossary onBack={goToGuides} />
            // Getting Started
            case 'getting-started':
                return <GettingStarted setView={setCurrentView} />
            // Hardware Detail Page
            case 'hardware-detail':
                return selectedHardware ? (
                    <HardwareDetail
                        hardware={selectedHardware}
                        onBack={() => {
                            setSelectedHardware(null)
                            setCurrentView('home')
                        }}
                        setView={setCurrentView}
                        allHardware={hardwareDatabase}
                        onSelectHardware={setSelectedHardware}
                    />
                ) : (
                    <HomeView
                        hardwareDatabase={hardwareDatabase}
                        setSelectedHardware={setSelectedHardware}
                        onCompare={addToCompare}
                        isInCompare={isInCompare}
                    />
                )
            // Hardware Comparator
            case 'compare':
                return (
                    <HardwareComparator
                        items={compareItems}
                        onRemove={removeFromCompare}
                        onClear={clearCompare}
                        onBack={() => setCurrentView('home')}
                        allHardware={hardwareDatabase}
                        onAdd={addToCompare}
                    />
                )
            default:
                return <HomeView
                    hardwareDatabase={hardwareDatabase}
                    setSelectedHardware={setSelectedHardware}
                    onCompare={addToCompare}
                    isInCompare={isInCompare}
                />
        }
    }

    // When hardware is selected, navigate to detail page
    useEffect(() => {
        if (selectedHardware && currentView === 'home') {
            setCurrentView('hardware-detail')
            window.scrollTo(0, 0)
        }
    }, [selectedHardware])

    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [currentView])

    return (
        <>
            <Header currentView={currentView} setView={setCurrentView} />
            <main key={currentView} className="main page-transition">
                {renderView()}
            </main>
            <Footer setView={setCurrentView} />
            <BackToTop />

            {/* Compare floating bar */}
            {compareItems.length > 0 && currentView !== 'compare' && (
                <div className="compare-bar">
                    <span>{compareItems.length}/2 selecionados</span>
                    <div className="compare-bar-items">
                        {compareItems.map(item => (
                            <div key={item.id} className="compare-bar-item">
                                <span>{item.modelo}</span>
                                <button onClick={() => removeFromCompare(item.id)}>
                                    <CloseIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary" onClick={() => setCurrentView('compare')}>
                        Comparar
                    </button>
                </div>
            )}

            {/* Global page background effects - visible on ALL pages */}
            <div className="page-bg-effects">
                <div className="page-orb page-orb-1" />
                <div className="page-orb page-orb-2" />
                <div className="page-orb page-orb-3" />
                <div className="page-grid" />
            </div>
        </>
    )
}

// =====================================================
// BACK TO TOP BUTTON
// =====================================================

const BackToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null

    return (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Voltar ao topo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
            </svg>
        </button>
    )
}

// =====================================================
// FOOTER
// =====================================================

const Footer = ({ setView }) => (
    <footer className="site-footer">
        <div className="footer-content">
            <div className="footer-brand">
                <span className="footer-logo">SILICON <span>REDLINE</span></span>
                <p>Base de dados de overclock seguro e testado.</p>
            </div>

            <div className="footer-links">
                <div className="footer-col">
                    <h4>Navegação</h4>
                    <button onClick={() => setView('home')}>Database</button>
                    <button onClick={() => setView('tools')}>Ferramentas</button>
                    <button onClick={() => setView('guides')}>Guias</button>
                </div>
                <div className="footer-col">
                    <h4>Recursos</h4>
                    <button onClick={() => setView('glossary')}>Glossário</button>
                    <button onClick={() => setView('getting-started')}>Começar</button>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>Configurações de overclock são sugestões. Resultados variam. Use por sua conta e risco.</p>
            <p className="footer-copy">Silicon Redline - Projeto open-source</p>
        </div>
    </footer>
)

export default App
