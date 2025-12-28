// =====================================================
// INTEL CPU OVERCLOCK GUIDE - Complete
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const OcCpuIntel = ({ onBack }) => {
    return (
        <GuideLayout
            title="Overclock CPU Intel"
            subtitle="Guia completo para overclock de CPUs Intel K/KF - ratios, voltagens e metodologia"
            difficulty="Avançado"
            readTime="25 min"
            onBack={onBack}
        >
            <Section title="Filosofia de OC Intel">
                <p>
                    CPUs Intel desbloqueados (série K/KF) permitem ajuste direto do multiplicador
                    (ratio) para definir frequências. O processo é mais tradicional que AMD -
                    aumentas ratio, defines voltagem, testas, e repetes.
                </p>
                <p>
                    A partir do 12th Gen, Intel usa arquitetura híbrida com P-Cores e E-Cores,
                    o que adiciona complexidade mas também flexibilidade.
                </p>
            </Section>

            <Warning title="Alerta 13th/14th Gen">
                Algumas motherboards vêm com configurações muito agressivas de fábrica que podem
                causar degradação prematura. <strong>Aplica "Intel Default Settings" na BIOS antes
                    de fazer OC</strong> para garantir um ponto de partida seguro.
            </Warning>

            <Section title="Requisitos">
                <ConfigList items={[
                    { field: 'CPU', value: 'Série K ou KF (ex: i9-14900K, i7-13700KF)' },
                    { field: 'Motherboard', value: 'Chipset Z (Z690, Z790)' },
                    { field: 'Arrefecimento', value: 'AIO 280mm+ ou tower topo de gama' },
                    { field: 'RAM', value: 'Kit de qualidade para evitar complicações' },
                    { field: 'Fonte', value: '850W+ para i9, 750W+ para i7/i5' },
                ]} />
            </Section>

            <Section title="Entender P-Cores vs E-Cores">
                <ConfigList items={[
                    { field: 'P-Cores', value: 'Performance cores - alta frequência, hyperthreading' },
                    { field: 'E-Cores', value: 'Efficiency cores - menor freq, mais eficientes' },
                    { field: 'Foco de OC', value: 'P-Cores são o principal alvo para gaming' },
                    { field: 'Relação', value: 'E-Cores ~800-1000MHz abaixo de P-Cores' },
                ]} />
            </Section>

            <Section title="Terminologia">
                <ConfigList items={[
                    { field: 'Ratio/Multiplier', value: 'Multiplicador × BCLK = Frequência (55x × 100 = 5.5GHz)' },
                    { field: 'BCLK', value: 'Base clock, geralmente 100MHz (não mexer a não ser avançado)' },
                    { field: 'VCore', value: 'Voltagem principal do CPU' },
                    { field: 'LLC', value: 'Load Line Calibration - compensa Vdroop' },
                    { field: 'PL1/PL2', value: 'Power Limits - limites de consumo' },
                    { field: 'IccMax', value: 'Limite de corrente máxima' },
                ]} />
            </Section>

            <Section title="Metodologia de Overclock">
                <Step number="1" title="Baseline e Intel Defaults">
                    Aplica "Intel Default Settings" na BIOS. Corre Cinebench R23 e anota:
                    score, temp máxima, clocks. Este é o teu ponto de comparação.
                </Step>

                <Step number="2" title="Remover Power Limits">
                    Define <Code>PL1 = PL2 = 4096W</Code> (unlimited) ou um valor alto como 300W.
                    Isto permite que o CPU atinja os clocks que defines.
                    <br />
                    Também aumenta IccMax para unlimited.
                </Step>

                <Step number="3" title="P-Core Ratio +1x">
                    Aumenta o ratio de todos os P-Cores em 1x. Exemplo: se stock é 54x, define 55x.
                    Usa "Sync All Cores" para simplificar.
                </Step>

                <Step number="4" title="Testar Estabilidade">
                    Arranca e corre Cinebench R23 Multi. Se completar sem crash e temps &lt;100°C,
                    continua. Se crashar, vai ao passo de voltagem.
                </Step>

                <Step number="5" title="Incrementar Ratio">
                    Aumenta mais 1x. Testa. Repete até encontrar instabilidade (crash ou BSOD).
                </Step>

                <Step number="6" title="Ajustar Voltagem">
                    Se crashar mas temps OK, o CPU precisa de mais voltagem:
                    <br />• Muda VCore para "Offset Mode"
                    <br />• Adiciona <Code>+25mV</Code>
                    <br />• Testa novamente
                    <br />• Repete até estável
                </Step>

                <Step number="7" title="LLC">
                    Se voltagem parecer suficiente mas ainda instável, aumenta LLC um nível
                    (ex: Level 4 → Level 5). Isto mantém voltagem mais estável sob carga.
                </Step>

                <Step number="8" title="E-Cores">
                    Com P-Cores estáveis, aumenta E-Cores. Mantém ~1000MHz abaixo dos P-Cores.
                    Ex: P-Cores 56x, E-Cores 45x.
                </Step>

                <Step number="9" title="Ring Ratio (Cache)">
                    O Ring (cache) pode ser OC separadamente. Mantém ~300-500MHz abaixo dos P-Cores.
                    Ring mais alto melhora latência, mas é sensível a voltagem.
                </Step>

                <Step number="10" title="Stress Test Final">
                    Corre <Code>Prime95 Small FFTs</Code> ou OCCT durante 30 minutos.
                    Monitoriza temps (máx 100°C) e verifica estabilidade.
                </Step>
            </Section>

            <Section title="Voltagem - Detalhes">
                <p><strong>Modos de VCore:</strong></p>
                <ConfigList items={[
                    { field: 'Auto', value: 'Motherboard decide - geralmente excessivo' },
                    { field: 'Adaptive', value: 'Base + turbo dinâmico - recomendado' },
                    { field: 'Offset', value: 'Adiciona/subtrai de Auto' },
                    { field: 'Override', value: 'Valor fixo - só para benchmarks' },
                ]} />

                <p><strong>Valores típicos em carga:</strong></p>
                <ConfigList items={[
                    { field: 'Stock', value: '~1.15-1.25V' },
                    { field: 'OC moderado', value: '~1.25-1.32V' },
                    { field: 'OC agressivo', value: '~1.32-1.40V' },
                    { field: 'Máximo recomendado', value: '1.40V (com excelente arrefecimento)' },
                ]} />

                <Warning>
                    Voltagem alta + carga prolongada = degradação. Para uso diário, mantém
                    abaixo de 1.35V em all-core stress.
                </Warning>
            </Section>

            <Section title="LLC - Load Line Calibration">
                <p>
                    LLC compensa a queda de voltagem sob carga (Vdroop):
                </p>
                <ConfigList items={[
                    { field: 'Level 1-2', value: 'Muito Vdroop, menos estável para OC' },
                    { field: 'Level 3-4', value: 'Equilibrado - bom ponto de partida' },
                    { field: 'Level 5-6', value: 'Pouco Vdroop - bom para OC' },
                    { field: 'Level 7-8 (Turbo)', value: 'Quase sem Vdroop - cuidado com overshoot' },
                ]} />
                <Tip>
                    Começa em Level 4. Se precisares de muita voltagem para estabilizar,
                    sobe o LLC em vez de adicionar mais voltage.
                </Tip>
            </Section>

            <Section title="Valores Típicos por CPU">
                <p><strong>14th Gen (Raptor Lake Refresh):</strong></p>
                <ConfigList items={[
                    { field: 'i9-14900K', value: 'P: 56-58x, E: 45-47x, ~1.30-1.38V' },
                    { field: 'i7-14700K', value: 'P: 55-57x, E: 44-46x, ~1.28-1.35V' },
                    { field: 'i5-14600K', value: 'P: 54-56x, E: 43-45x, ~1.25-1.32V' },
                ]} />

                <p><strong>12th Gen (Alder Lake):</strong></p>
                <ConfigList items={[
                    { field: 'i9-12900K', value: 'P: 52-54x, E: 40-42x, ~1.28-1.35V' },
                    { field: 'i7-12700K', value: 'P: 51-53x, E: 39-41x, ~1.25-1.32V' },
                    { field: 'i5-12600K', value: 'P: 50-52x, E: 38-40x, ~1.22-1.30V' },
                ]} />
            </Section>

            <Section title="Undervolting (Alternativa)">
                <p>
                    Em vez de OC, podes reduzir voltagem mantendo clocks stock. Resultado:
                    menos calor, mais silencioso, sem perda de performance.
                </p>
                <Step number="1">Usa Offset mode com valor negativo (ex: -50mV).</Step>
                <Step number="2">Testa estabilidade com Cinebench/Prime95.</Step>
                <Step number="3">Se estável, tenta -75mV. Repete até instável, depois recua.</Step>
            </Section>

            <Section title="Resolução de Problemas">
                <ConfigList items={[
                    { field: 'WHEA_UNCORRECTABLE_ERROR', value: 'Voltagem insuficiente para o ratio' },
                    { field: 'CLOCK_WATCHDOG_TIMEOUT', value: 'Core não respondeu - ratio alto demais' },
                    { field: 'MACHINE_CHECK_EXCEPTION', value: 'Problema de hardware/voltagem' },
                    { field: 'Throttling constante', value: 'Power limits ainda ativos ou temp alta' },
                    { field: 'Performance baixa', value: 'Verifica se PL1/PL2 estão desbloqueados' },
                ]} />
            </Section>
        </GuideLayout>
    )
}

export default OcCpuIntel
