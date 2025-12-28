// =====================================================
// GETTING STARTED PAGE - "Começar"
// =====================================================

import {
    CompassIcon, CpuIcon, DownloadIcon, BookIcon, ArrowIcon, ZapIcon,
    ShieldIcon, ThermometerIcon, TargetIcon
} from '../components/Icons'

const GettingStarted = ({ setView }) => {
    const quickLinks = [
        { icon: <CpuIcon />, label: 'Database', desc: 'Encontra o teu hardware', view: 'home' },
        { icon: <DownloadIcon />, label: 'Ferramentas', desc: 'Software essencial', view: 'tools' },
        { icon: <BookIcon />, label: 'Guias', desc: 'Tutoriais completos', view: 'guides' },
    ]

    const steps = [
        {
            num: '01',
            title: 'Identifica o Hardware',
            desc: 'Abre CPU-Z ou GPU-Z para ver o modelo exato do teu processador ou placa gráfica.',
        },
        {
            num: '02',
            title: 'Pesquisa na Database',
            desc: 'Procura o teu modelo na nossa base de dados para ver configurações de OC recomendadas.',
        },
        {
            num: '03',
            title: 'Instala o Software',
            desc: 'Faz download do software necessário: MSI Afterburner para GPUs, Ryzen Master ou XTU para CPUs.',
        },
        {
            num: '04',
            title: 'Segue um Guia',
            desc: 'Lê o guia apropriado e aplica as configurações passo-a-passo, testando a estabilidade.',
        },
    ]

    const notes = [
        {
            icon: <ShieldIcon />,
            title: 'Segurança',
            desc: 'Nunca excedas as voltagens recomendadas. O hardware moderno protege-se automaticamente mas a degradação é real.',
        },
        {
            icon: <ThermometerIcon />,
            title: 'Temperaturas',
            desc: 'Mantém HWiNFO aberto durante testes. CPUs até 85°C e GPUs até 80°C são valores seguros.',
        },
        {
            icon: <TargetIcon />,
            title: 'Silicon Lottery',
            desc: 'Nem todos os chips são iguais. Resultados variam - os valores na database são médias seguras.',
        },
    ]

    return (
        <div className="gs-page">
            {/* Header */}
            <div className="tools-hero">
                <CompassIcon />
                <h1 className="page-title">COMO <span>COMEÇAR</span></h1>
                <p className="page-subtitle">
                    Novo no overclock? Segue estes passos para começar de forma segura.
                </p>
            </div>

            {/* Quick Links */}
            <div className="gs-quick-links">
                {quickLinks.map((link, idx) => (
                    <button key={idx} className="gs-quick-link" onClick={() => setView(link.view)}>
                        <div className="gs-quick-icon">{link.icon}</div>
                        <div className="gs-quick-content">
                            <span className="gs-quick-label">{link.label}</span>
                            <span className="gs-quick-desc">{link.desc}</span>
                        </div>
                        <ArrowIcon />
                    </button>
                ))}
            </div>

            {/* Steps */}
            <div className="gs-section">
                <h2 className="gs-section-title">Passos Rápidos</h2>
                <div className="gs-steps-grid">
                    {steps.map((step, idx) => (
                        <div key={idx} className="gs-step-card">
                            <div className="gs-step-num">{step.num}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Important Notes */}
            <div className="gs-section">
                <h2 className="gs-section-title">Notas Importantes</h2>
                <div className="gs-notes-grid">
                    {notes.map((note, idx) => (
                        <div key={idx} className="gs-note">
                            <div className="gs-note-icon">{note.icon}</div>
                            <div className="gs-note-content">
                                <h4>{note.title}</h4>
                                <p>{note.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="gs-cta">
                <h3>Pronto para começar?</h3>
                <p>Explora a database para encontrar o teu hardware.</p>
                <button className="btn btn-primary" onClick={() => setView('home')}>
                    <ZapIcon /> Ir para Database
                </button>
            </div>
        </div>
    )
}

export default GettingStarted
