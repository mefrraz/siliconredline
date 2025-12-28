// =====================================================
// HARDWARE DETAIL PAGE - Full Page View
// =====================================================

import { useEffect, useState } from 'react'
import {
    ZapIcon, CpuIcon, GpuIcon, BookIcon, DownloadIcon,
    ArrowIcon, LightbulbIcon, ClockIcon, CheckIcon
} from '../components/Icons'

const HardwareDetail = ({ hardware, onBack, setView, allHardware = [], onSelectHardware }) => {
    const [copied, setCopied] = useState(false)

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [hardware])

    if (!hardware) return null

    // Get related hardware (same type, different model)
    const relatedHardware = allHardware
        .filter(h => h.tipo === hardware.tipo && h.id !== hardware.id && h.marca === hardware.marca)
        .slice(0, 3)


    // Copy config to clipboard
    const copyConfig = () => {
        const config = [
            `${hardware.modelo} - Overclock Recomendado`,
            ``,
            `Clock Alvo: ${hardware.specs_oc_recomendado?.clock_alvo || 'N/A'}`,
            `Voltagem: ${hardware.specs_oc_recomendado?.voltagem_safe || 'N/A'}`,
            `Temp Máx: ${hardware.specs_oc_recomendado?.temp_max_alvo || 'N/A'}`,
            `Ganho: ${hardware.specs_oc_recomendado?.ganho_estimado || 'N/A'}`,
            ``,
            `Configuração ${hardware.configuracao_software?.programa_nome || 'Software'}:`,
            ...(hardware.configuracao_software?.ajustes?.map(a => `${a.campo}: ${a.valor}`) || []),
            ``,
            `Fonte: Silicon Redline`
        ].join('\n')

        navigator.clipboard.writeText(config).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    // Export configuration to file
    const exportConfig = (format) => {
        let content, filename, mimeType

        if (format === 'json') {
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
            content = JSON.stringify(config, null, 2)
            filename = `${hardware.modelo.replace(/\s+/g, '_')}_OC_Config.json`
            mimeType = 'application/json'
        } else {
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
            txt += `  Gerado por Silicon Redline\n`
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

    // Determine guides
    const guiaUrl = hardware.configuracao_software?.guia_url
    let softwareGuide = null
    let softwareGuideName = hardware.configuracao_software?.programa_nome

    if (guiaUrl) {
        if (guiaUrl.includes('msi-afterburner')) softwareGuide = 'guide-msi'
        else if (guiaUrl.includes('ryzen-master')) softwareGuide = 'guide-ryzen'
        else if (guiaUrl.includes('intel-xtu')) softwareGuide = 'guide-intel-xtu'
        else if (guiaUrl.includes('bios')) softwareGuide = 'guide-bios'
    }

    // Determine OC guide
    let ocGuide = null
    let ocGuideName = ''
    if (hardware.tipo === 'GPU') {
        ocGuide = 'guide-oc-gpu'
        ocGuideName = 'Overclock de GPU'
    } else if (hardware.tipo === 'CPU') {
        if (hardware.marca === 'AMD') {
            ocGuide = 'guide-oc-cpu-amd'
            ocGuideName = 'Overclock CPU AMD'
        } else if (hardware.marca === 'Intel') {
            ocGuide = 'guide-oc-cpu-intel'
            ocGuideName = 'Overclock CPU Intel'
        }
    }

    const difficultyClass = hardware.dificuldade?.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'medio'

    const difficultyLabel = {
        'facil': 'Fácil - Bom para iniciantes',
        'medio': 'Médio - Alguma experiência recomendada',
        'avancado': 'Avançado - Requer conhecimento prévio',
    }

    const handleGuideClick = (view) => {
        if (view) {
            setView(view)
        }
    }

    return (
        <div className="hw-detail-page">
            {/* Back Button */}
            <button className="hw-detail-back" onClick={onBack}>
                ← Voltar à Database
            </button>

            {/* Header */}
            <div className="hw-detail-header">
                <div className="hw-detail-badges">
                    <span className={`badge badge-${hardware.tipo?.toLowerCase()}`}>
                        {hardware.tipo === 'CPU' ? <CpuIcon /> : <GpuIcon />}
                        {hardware.tipo}
                    </span>
                    <span className={`badge badge-difficulty-${difficultyClass}`}>
                        {hardware.dificuldade}
                    </span>
                </div>

                <h1 className="hw-detail-title">{hardware.modelo}</h1>

                <div className="hw-detail-meta">
                    <span className="hw-detail-brand">{hardware.marca}</span>
                    <span className="hw-detail-divider">•</span>
                    <span className="hw-detail-arch">{hardware.arquitetura}</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="hw-detail-grid">
                {/* Left Column - Specs */}
                <div className="hw-detail-main">
                    {/* Stock Specs */}
                    <section className="hw-section">
                        <h2 className="hw-section-header">
                            <CpuIcon /> Especificações Stock
                        </h2>
                        <div className="hw-specs-grid">
                            <div className="hw-spec-card">
                                <div className="hw-spec-label">Clock Base</div>
                                <div className="hw-spec-value">{hardware.specs_stock?.clock_base || 'N/A'}</div>
                            </div>
                            <div className="hw-spec-card">
                                <div className="hw-spec-label">Clock Boost</div>
                                <div className="hw-spec-value">{hardware.specs_stock?.clock_boost || 'N/A'}</div>
                            </div>
                            {hardware.tipo === 'CPU' ? (
                                <div className="hw-spec-card">
                                    <div className="hw-spec-label">Cores / Threads</div>
                                    <div className="hw-spec-value">{hardware.specs_stock?.nucleos_threads || 'N/A'}</div>
                                </div>
                            ) : (
                                <div className="hw-spec-card">
                                    <div className="hw-spec-label">VRAM</div>
                                    <div className="hw-spec-value">{hardware.specs_stock?.vram || 'N/A'}</div>
                                </div>
                            )}
                            <div className="hw-spec-card">
                                <div className="hw-spec-label">TDP</div>
                                <div className="hw-spec-value">{hardware.specs_stock?.tdp || 'N/A'}</div>
                            </div>
                            {hardware.specs_stock?.memory_clock && (
                                <div className="hw-spec-card">
                                    <div className="hw-spec-label">Memory Clock</div>
                                    <div className="hw-spec-value">{hardware.specs_stock?.memory_clock}</div>
                                </div>
                            )}
                            {hardware.specs_stock?.cache && (
                                <div className="hw-spec-card">
                                    <div className="hw-spec-label">Cache</div>
                                    <div className="hw-spec-value">{hardware.specs_stock?.cache}</div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* OC Comparison */}
                    <section className="hw-section">
                        <h2 className="hw-section-header">
                            <ZapIcon /> Overclock Recomendado
                        </h2>

                        <div className="hw-oc-comparison">
                            <div className="hw-oc-col hw-oc-stock">
                                <div className="hw-oc-col-header">
                                    <span>Stock</span>
                                </div>
                                <div className="hw-oc-items">
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Clock</span>
                                        <span className="hw-oc-value">{hardware.specs_stock?.clock_boost || 'N/A'}</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Voltagem</span>
                                        <span className="hw-oc-value">Auto</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Temp. Máx</span>
                                        <span className="hw-oc-value">-</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Performance</span>
                                        <span className="hw-oc-value">Baseline</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hw-oc-arrow">
                                <ArrowIcon />
                            </div>

                            <div className="hw-oc-col hw-oc-recommended">
                                <div className="hw-oc-col-header">
                                    <span>OC Seguro</span>
                                    <span className="hw-oc-badge">{hardware.specs_oc_recomendado?.ganho_estimado || 'N/A'}</span>
                                </div>
                                <div className="hw-oc-items">
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Clock</span>
                                        <span className="hw-oc-value highlight">{hardware.specs_oc_recomendado?.clock_alvo || 'N/A'}</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Voltagem</span>
                                        <span className="hw-oc-value highlight">{hardware.specs_oc_recomendado?.voltagem_safe || 'N/A'}</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Temp. Máx</span>
                                        <span className="hw-oc-value highlight">{hardware.specs_oc_recomendado?.temp_max_alvo || 'N/A'}</span>
                                    </div>
                                    <div className="hw-oc-item">
                                        <span className="hw-oc-label">Performance</span>
                                        <span className="hw-oc-value gain">{hardware.specs_oc_recomendado?.ganho_estimado || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hw-difficulty-note">
                            <span className={`badge badge-difficulty-${difficultyClass}`}>
                                {hardware.dificuldade}
                            </span>
                            <span>{difficultyLabel[difficultyClass] || 'Dificuldade média'}</span>
                        </div>
                    </section>

                    {/* Software Configuration */}
                    <section className="hw-section">
                        <h2 className="hw-section-header">
                            <DownloadIcon /> Configuração no {softwareGuideName || 'Software'}
                        </h2>

                        <div className="hw-config-list">
                            {hardware.configuracao_software?.ajustes?.map((ajuste, idx) => (
                                <div key={idx} className="hw-config-row">
                                    <span className="hw-config-field">{ajuste.campo}</span>
                                    <span className="hw-config-value">{ajuste.valor}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hw-action-buttons">
                            <button className={`hw-copy-btn ${copied ? 'copied' : ''}`} onClick={copyConfig}>
                                {copied ? <><CheckIcon /> Copiado!</> : 'Copiar Configuração'}
                            </button>
                            <button className="hw-export-btn" onClick={() => exportConfig('txt')} title="Download TXT">
                                <DownloadIcon /> TXT
                            </button>
                            <button className="hw-export-btn" onClick={() => exportConfig('json')} title="Download JSON">
                                <DownloadIcon /> JSON
                            </button>
                        </div>

                        {softwareGuide && (
                            <button
                                className="hw-guide-btn"
                                onClick={() => handleGuideClick(softwareGuide)}
                            >
                                <BookIcon />
                                <span>Guia Completo: {softwareGuideName}</span>
                                <ArrowIcon />
                            </button>
                        )}
                    </section>

                    {/* Pro Tip */}
                    {hardware.dica_mestre && (
                        <section className="hw-tip-section">
                            <div className="hw-tip-icon">
                                <LightbulbIcon />
                            </div>
                            <div className="hw-tip-content">
                                <h3>Dica do Mestre</h3>
                                <p>{hardware.dica_mestre}</p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Sidebar */}
                <aside className="hw-detail-sidebar">
                    {/* Quick Actions */}
                    <div className="hw-sidebar-card">
                        <h3>Guias Relacionados</h3>

                        {ocGuide && (
                            <button
                                className="hw-sidebar-btn primary"
                                onClick={() => handleGuideClick(ocGuide)}
                            >
                                <ZapIcon />
                                <div>
                                    <span className="btn-title">{ocGuideName}</span>
                                    <span className="btn-desc">Metodologia passo-a-passo</span>
                                </div>
                            </button>
                        )}

                        {softwareGuide && (
                            <button
                                className="hw-sidebar-btn"
                                onClick={() => handleGuideClick(softwareGuide)}
                            >
                                <DownloadIcon />
                                <div>
                                    <span className="btn-title">{softwareGuideName}</span>
                                    <span className="btn-desc">Tutorial do software</span>
                                </div>
                            </button>
                        )}

                        <button
                            className="hw-sidebar-btn"
                            onClick={() => setView('glossary')}
                        >
                            <BookIcon />
                            <div>
                                <span className="btn-title">Glossário</span>
                                <span className="btn-desc">Termos técnicos explicados</span>
                            </div>
                        </button>
                    </div>

                    {/* Info Card */}
                    <div className="hw-sidebar-card hw-info-card">
                        <h3>Sobre este OC</h3>
                        <div className="hw-info-item">
                            <ClockIcon />
                            <span>Valores testados pela comunidade</span>
                        </div>
                        <div className="hw-info-item">
                            <ZapIcon />
                            <span>Safe Daily - uso diário seguro</span>
                        </div>
                        <div className="hw-info-item">
                            <LightbulbIcon />
                            <span>Resultados podem variar (silicon lottery)</span>
                        </div>
                    </div>

                    {/* Related Hardware */}
                    {relatedHardware.length > 0 && onSelectHardware && (
                        <div className="hw-sidebar-card">
                            <h3>Hardware Relacionado</h3>
                            <div className="hw-related-list">
                                {relatedHardware.map(h => (
                                    <button
                                        key={h.id}
                                        className="hw-related-item"
                                        onClick={() => onSelectHardware(h)}
                                    >
                                        <span className="hw-related-name">{h.modelo}</span>
                                        <span className="hw-related-gain">{h.specs_oc_recomendado?.ganho_estimado}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default HardwareDetail
