// =====================================================
// UNDERVOLTING GUIDE - Reduce voltage for efficiency
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const Undervolting = ({ onBack }) => {
    return (
        <GuideLayout
            title="Undervolting"
            subtitle="Reduz voltagem para menos calor, menos consumo e possivelmente mais performance"
            difficulty="Médio"
            readTime="15 min"
            onBack={onBack}
        >
            <Section title="O que é Undervolting?">
                <p>
                    Undervolting é o <strong>oposto de overclock tradicional</strong> - em vez de
                    aumentar voltagem para mais frequência, reduces a voltagem mantendo a mesma
                    frequência (ou até aumentando-a).
                </p>
                <p>
                    Resulta em: <strong>menos calor, menos consumo, fans mais silenciosas</strong>,
                    e por vezes até mais performance (porque há menos throttling térmico).
                </p>
            </Section>

            <Section title="Porque fazer Undervolting?">
                <ConfigList items={[
                    { field: 'Temperaturas mais baixas', value: '5-15°C de redução é comum' },
                    { field: 'Menos ruído', value: 'Fans não precisam trabalhar tanto' },
                    { field: 'Menor consumo', value: 'Importante para portáteis e conta de luz' },
                    { field: 'Mais performance', value: 'Menos throttling = clocks sustentados mais altos' },
                    { field: 'Maior longevidade', value: 'Menos calor e voltagem = hardware dura mais' },
                ]} />
            </Section>

            <Section title="Undervolting de GPU (MSI Afterburner)">
                <Step number="1" title="Abrir Curve Editor">
                    No MSI Afterburner, pressiona Ctrl+F para abrir o editor de curva V/F.
                </Step>
                <Step number="2" title="Entender a Curva">
                    O eixo X é voltagem (mV), eixo Y é frequência (MHz).
                    O objetivo é atingir a mesma frequência com menos voltagem.
                </Step>
                <Step number="3" title="Definir Alvo">
                    Encontra a frequência máxima que a tua GPU atinge em stock (ex: 2000 MHz).
                    Nota a voltagem necessária (ex: 1050mV).
                </Step>
                <Step number="4" title="Aplicar Undervolt">
                    Encontra um ponto de voltagem mais baixo (ex: 950mV) e arrasta-o para
                    a frequência alvo (2000 MHz). Achata a curva daí para a direita.
                </Step>
                <Step number="5" title="Testar">
                    Aplica e testa em jogos. Se houver crashes, usa uma voltagem ligeiramente maior.
                </Step>
            </Section>

            <Section title="Undervolting de CPU AMD (Curve Optimizer)">
                <p>
                    O Curve Optimizer no Ryzen Master ou BIOS permite undervolt por core:
                </p>
                <Step number="1" title="Aceder">
                    BIOS: AMD Overclocking → Precision Boost Overdrive → Curve Optimizer
                </Step>
                <Step number="2" title="All Core vs Per Core">
                    All Core é mais fácil. Per Core é mais optimizado.
                </Step>
                <Step number="3" title="Começar Conservador">
                    Começa com -10 a -15 em "All Core Curve Optimizer".
                </Step>
                <Step number="4" title="Testar">
                    Usa Cinebench e CoreCycler para testar estabilidade de cada core.
                </Step>
                <Step number="5" title="Ajustar">
                    Aumenta o valor negativo gradualmente (-20, -25, -30) até encontrar instabilidade.
                </Step>
            </Section>

            <Section title="Undervolting de CPU Intel">
                <p>
                    No Intel XTU ou ThrottleStop:
                </p>
                <ConfigList items={[
                    { field: 'Core Voltage Offset', value: 'Valor negativo (ex: -50mV a -150mV)' },
                    { field: 'Cache Voltage Offset', value: 'Geralmente igual ou próximo do core' },
                ]} />
                <Step number="1" title="Começar">
                    Define Core Voltage Offset para -50mV.
                </Step>
                <Step number="2" title="Testar">
                    Corre stress tests e uso normal.
                </Step>
                <Step number="3" title="Aumentar">
                    Se estável, tenta -75mV, depois -100mV, etc.
                </Step>
                <Warning>
                    CPUs Intel 12th/13th/14th gen têm limitações. Nem todas suportam undervolt.
                </Warning>
            </Section>

            <Section title="Resultados Típicos">
                <ConfigList items={[
                    { field: 'GPU NVIDIA', value: '-50 a -150mV possível' },
                    { field: 'GPU AMD', value: '-50 a -100mV possível' },
                    { field: 'CPU AMD Ryzen', value: '-15 a -30 Curve Optimizer típico' },
                    { field: 'CPU Intel', value: '-50 a -150mV dependendo do chip' },
                ]} />
            </Section>

            <Section title="Sinais de Undervolt Excessivo">
                <ConfigList items={[
                    { field: 'Crashes em jogos', value: 'Especialmente em cenas pesadas' },
                    { field: 'WHEA errors', value: 'Erros reportados no Event Viewer' },
                    { field: 'Crashes em cold boot', value: 'Falha ao ligar o PC de manhã' },
                    { field: 'Erros em stress tests', value: 'Erros em Prime95, OCCT, etc' },
                ]} />
                <Tip>
                    Se encontrares instabilidade, recua 10-20mV do último valor estável.
                </Tip>
            </Section>

            <Warning>
                Undervolting é geralmente seguro, mas testa bem! Instabilidade pode causar
                corrupção de dados. Guarda trabalho importante antes de testar.
            </Warning>
        </GuideLayout>
    )
}

export default Undervolting
