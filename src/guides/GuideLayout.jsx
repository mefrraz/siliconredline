// =====================================================
// GUIDE LAYOUT - Reusable template for all guides
// =====================================================
// This provides consistent layout and styling for all guides
// with improved visual design and spacing

import { ArrowLeftIcon, ClockIcon } from '../components/Icons'

const GuideLayout = ({
    children,
    title,
    subtitle,
    difficulty = 'Médio',
    readTime = '15 min',
    onBack
}) => {
    const getDifficultyColor = () => {
        switch (difficulty.toLowerCase()) {
            case 'iniciante': return 'green'
            case 'médio': case 'medio': return 'yellow'
            case 'avançado': case 'avancado': return 'infrared'
            default: return 'cyan'
        }
    }

    return (
        <div className="guide-page">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs">
                <button onClick={onBack}>Guias</button>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">{title}</span>
            </nav>

            {/* Back navigation */}
            <button className="guide-back-btn" onClick={onBack}>
                <ArrowLeftIcon /> Voltar aos Guias
            </button>

            {/* Guide header with meta info */}
            <div className="guide-header">
                <div className="guide-meta">
                    <span className={`guide-difficulty guide-difficulty-${getDifficultyColor()}`}>
                        {difficulty}
                    </span>
                    <span className="guide-time">
                        <ClockIcon /> {readTime}
                    </span>
                </div>
                <h1 className="guide-title">{title}</h1>
                <p className="guide-subtitle">{subtitle}</p>
            </div>

            {/* Guide content */}
            <div className="guide-body">
                {children}
            </div>
        </div>
    )
}

// =====================================================
// REUSABLE GUIDE COMPONENTS
// =====================================================

// Section with title
export const Section = ({ title, children }) => (
    <section className="guide-section">
        <h2 className="guide-section-title">{title}</h2>
        {children}
    </section>
)

// Numbered step
export const Step = ({ number, title, children }) => (
    <div className="guide-step">
        <div className="guide-step-number">{number}</div>
        <div className="guide-step-content">
            {title && <div className="guide-step-title">{title}</div>}
            <div className="guide-step-text">{children}</div>
        </div>
    </div>
)

// Warning/alert box
export const Warning = ({ title = 'Aviso Importante', children }) => (
    <div className="guide-warning">
        <div className="guide-warning-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
            </svg>
            {title}
        </div>
        <div className="guide-warning-content">{children}</div>
    </div>
)

// Tip/info box
export const Tip = ({ title = 'Dica', children }) => (
    <div className="guide-tip">
        <div className="guide-tip-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
            </svg>
            {title}
        </div>
        <div className="guide-tip-content">{children}</div>
    </div>
)

// Code/command block
export const Code = ({ children }) => (
    <code className="guide-code">{children}</code>
)

// Key-value config item
export const ConfigItem = ({ field, value }) => (
    <div className="guide-config-item">
        <span className="guide-config-field">{field}</span>
        <span className="guide-config-value">{value}</span>
    </div>
)

// List of config items
export const ConfigList = ({ items }) => (
    <div className="guide-config-list">
        {items.map((item, idx) => (
            <ConfigItem key={idx} field={item.field} value={item.value} />
        ))}
    </div>
)

export default GuideLayout
