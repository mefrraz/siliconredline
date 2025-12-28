// =====================================================
// HARDWARE COMPARATOR - Modern Card-based comparison
// =====================================================

import { useState } from 'react'
import {
    CpuIcon, GpuIcon, ZapIcon, CloseIcon, ArrowIcon, SearchIcon
} from '../components/Icons'

const HardwareComparator = ({ items = [], onRemove, onClear, onBack, allHardware = [], onAdd }) => {
    const [showSelector, setShowSelector] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')

    // Filter hardware for selector - ensure ALL hardware shows
    const availableHardware = allHardware
        .filter(h => !items.find(i => i.id === h.id))
        .filter(h => {
            const matchesSearch = !searchTerm ||
                h.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                h.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                h.arquitetura?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = typeFilter === 'all' || h.tipo?.toLowerCase() === typeFilter
            return matchesSearch && matchesType
        })

    const getTypeIcon = (tipo) => tipo === 'CPU' ? <CpuIcon /> : <GpuIcon />

    const getValue = (item, path, fallback = '-') => {
        const keys = path.split('.')
        let value = item
        for (const key of keys) {
            value = value?.[key]
            if (value === undefined) return fallback
        }
        return value || fallback
    }

    // Slot component - empty or with hardware
    const CompareSlot = ({ item, slotNumber }) => {
        if (!item) {
            return (
                <div className="compare-slot compare-slot-empty" onClick={() => setShowSelector(true)}>
                    <div className="compare-slot-add">
                        <div className="compare-slot-add-icon">+</div>
                        <div className="compare-slot-add-text">Selecionar Hardware {slotNumber}</div>
                    </div>
                </div>
            )
        }

        const isGPU = item.tipo === 'GPU'
        const diffClass = item.dificuldade?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'medio'

        return (
            <div className={`compare-slot compare-slot-filled ${isGPU ? 'slot-gpu' : 'slot-cpu'}`}>
                <button className="compare-slot-remove" onClick={() => onRemove(item.id)}>
                    <CloseIcon />
                </button>

                <div className="compare-slot-header">
                    <span className={`compare-slot-type ${isGPU ? 'type-gpu' : 'type-cpu'}`}>
                        {getTypeIcon(item.tipo)} {item.tipo}
                    </span>
                    <span className={`compare-slot-difficulty difficulty-${diffClass}`}>
                        {item.dificuldade}
                    </span>
                </div>

                <h3 className="compare-slot-title">{item.modelo}</h3>
                <p className="compare-slot-brand">{item.marca} • {item.arquitetura}</p>

                <div className="compare-slot-gain">
                    <span className="gain-label">Ganho OC</span>
                    <span className="gain-value">{getValue(item, 'specs_oc_recomendado.ganho_estimado')}</span>
                </div>

                <div className="compare-slot-specs">
                    <div className="compare-spec">
                        <span className="spec-name">Clock Base</span>
                        <span className="spec-val">{getValue(item, 'specs_stock.clock_base')}</span>
                    </div>
                    <div className="compare-spec">
                        <span className="spec-name">Clock Boost</span>
                        <span className="spec-val">{getValue(item, 'specs_stock.clock_boost')}</span>
                    </div>
                    {isGPU ? (
                        <div className="compare-spec">
                            <span className="spec-name">VRAM</span>
                            <span className="spec-val">{getValue(item, 'specs_stock.vram')}</span>
                        </div>
                    ) : (
                        <div className="compare-spec">
                            <span className="spec-name">Cores/Threads</span>
                            <span className="spec-val">{getValue(item, 'specs_stock.nucleos_threads')}</span>
                        </div>
                    )}
                    <div className="compare-spec">
                        <span className="spec-name">TDP</span>
                        <span className="spec-val">{getValue(item, 'specs_stock.tdp')}</span>
                    </div>
                </div>

                <div className="compare-slot-oc">
                    <div className="oc-title">Configuração OC</div>
                    <div className="compare-spec">
                        <span className="spec-name">Clock Alvo</span>
                        <span className="spec-val">{getValue(item, 'specs_oc_recomendado.clock_alvo')}</span>
                    </div>
                    <div className="compare-spec">
                        <span className="spec-name">Voltagem</span>
                        <span className="spec-val">{getValue(item, 'specs_oc_recomendado.voltagem_safe')}</span>
                    </div>
                    <div className="compare-spec">
                        <span className="spec-name">Temp. Máx</span>
                        <span className="spec-val">{getValue(item, 'specs_oc_recomendado.temp_max_alvo')}</span>
                    </div>
                </div>

                <div className="compare-slot-software">
                    <span className="software-label">Software:</span>
                    <span className="software-name">{getValue(item, 'configuracao_software.programa_nome', 'N/A')}</span>
                </div>
            </div>
        )
    }

    // Chart/Compare icon
    const CompareIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    )

    return (
        <div className="comparator-page-v2">
            {/* Hero Section */}
            <div className="tools-hero">
                <CompareIcon />
                <h1 className="page-title">COMPARADOR <span>DE HARDWARE</span></h1>
                <p className="page-subtitle">
                    Compara especificações, configurações OC e potencial de overclock lado a lado.
                </p>
            </div>

            {/* Action Bar */}
            <div className="comparator-actions">
                <button className="comparator-back-v2" onClick={onBack}>
                    <ArrowIcon /> Voltar à Database
                </button>
                {items.length > 0 && (
                    <button className="comparator-clear" onClick={onClear}>
                        <CloseIcon /> Limpar Seleção
                    </button>
                )}
            </div>

            {/* Comparison slots */}
            <div className="compare-slots">
                <CompareSlot item={items[0]} slotNumber={1} />
                <div className="compare-vs">
                    <div className="compare-vs-line"></div>
                    <span className="compare-vs-text">VS</span>
                    <div className="compare-vs-line"></div>
                </div>
                <CompareSlot item={items[1]} slotNumber={2} />
            </div>

            {/* Selector Modal */}
            {showSelector && (
                <div className="selector-overlay" onClick={() => setShowSelector(false)}>
                    <div className="selector-modal" onClick={e => e.stopPropagation()}>
                        <div className="selector-header">
                            <h3>Selecionar Hardware</h3>
                            <button onClick={() => setShowSelector(false)}><CloseIcon /></button>
                        </div>

                        <div className="selector-filters">
                            <div className="selector-search">
                                <SearchIcon />
                                <input
                                    type="text"
                                    placeholder="Pesquisar por marca ou modelo..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="selector-type-filters">
                                <button
                                    className={`type-filter ${typeFilter === 'all' ? 'active' : ''}`}
                                    onClick={() => setTypeFilter('all')}
                                >
                                    Todos
                                </button>
                                <button
                                    className={`type-filter ${typeFilter === 'cpu' ? 'active' : ''}`}
                                    onClick={() => setTypeFilter('cpu')}
                                >
                                    <CpuIcon /> CPU
                                </button>
                                <button
                                    className={`type-filter ${typeFilter === 'gpu' ? 'active' : ''}`}
                                    onClick={() => setTypeFilter('gpu')}
                                >
                                    <GpuIcon /> GPU
                                </button>
                            </div>
                        </div>

                        <div className="selector-count">
                            {availableHardware.length} resultados
                        </div>

                        <div className="selector-list">
                            {availableHardware.slice(0, 50).map(h => (
                                <button
                                    key={h.id}
                                    className="selector-item"
                                    onClick={() => {
                                        onAdd(h)
                                        setShowSelector(false)
                                        setSearchTerm('')
                                        setTypeFilter('all')
                                    }}
                                >
                                    <span className={`selector-item-type ${h.tipo === 'GPU' ? 'type-gpu' : 'type-cpu'}`}>
                                        {getTypeIcon(h.tipo)}
                                    </span>
                                    <div className="selector-item-info">
                                        <span className="selector-item-name">{h.modelo}</span>
                                        <span className="selector-item-meta">{h.marca} • {h.arquitetura}</span>
                                    </div>
                                    <span className="selector-item-gain">{h.specs_oc_recomendado?.ganho_estimado}</span>
                                </button>
                            ))}
                            {availableHardware.length === 0 && (
                                <div className="selector-empty">
                                    <p>Nenhum hardware encontrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HardwareComparator
