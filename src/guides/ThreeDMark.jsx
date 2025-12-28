// =====================================================
// 3DMARK GUIDE - GPU and Gaming Benchmark
// =====================================================

import GuideLayout, { Section, Step, Tip, ConfigList } from './GuideLayout'

const ThreeDMark = ({ onBack }) => {
    return (
        <GuideLayout
            title="3DMark"
            subtitle="O benchmark de gaming mais popular - scores comparáveis mundialmente"
            difficulty="Iniciante"
            readTime="8 min"
            onBack={onBack}
        >
            <Section title="O que é o 3DMark?">
                <p>
                    O 3DMark é o <strong>benchmark de gaming mais reconhecido</strong> do mundo.
                    Desenvolvido pela UL Benchmarks, oferece testes gráficos que simulam jogos reais
                    e permite comparar resultados com milhões de sistemas mundialmente.
                </p>
            </Section>

            <Section title="Versões">
                <ConfigList items={[
                    { field: '3DMark (Pago)', value: 'Todos os testes, stress test, custom runs' },
                    { field: '3DMark Demo (Grátis)', value: 'Time Spy e Fire Strike básicos' },
                    { field: 'Steam', value: 'Disponível na Steam - versão demo grátis' },
                ]} />
                <Tip>
                    A versão gratuita da Steam é suficiente para comparar GPUs.
                    A versão paga adiciona stress tests e mais benchmarks.
                </Tip>
            </Section>

            <Section title="Testes Principais">
                <ConfigList items={[
                    { field: 'Time Spy', value: 'DirectX 12 - o mais usado para GPUs modernas' },
                    { field: 'Time Spy Extreme', value: 'Versão 4K - para GPUs high-end' },
                    { field: 'Fire Strike', value: 'DirectX 11 - ainda relevante' },
                    { field: 'Fire Strike Ultra', value: 'Versão 4K DirectX 11' },
                    { field: 'Port Royal', value: 'Ray Tracing - RTX/RX 6000+' },
                    { field: 'Speed Way', value: 'Ray Tracing moderno - muito exigente' },
                ]} />
            </Section>

            <Section title="Qual Teste Usar">
                <ConfigList items={[
                    { field: 'GPU recente (RTX 30/40, RX 6000/7000)', value: 'Time Spy' },
                    { field: 'GPU mais antiga (GTX 10, RX 500)', value: 'Fire Strike' },
                    { field: 'Comparar Ray Tracing', value: 'Port Royal' },
                    { field: 'PC completo', value: 'Time Spy (inclui CPU Score)' },
                ]} />
            </Section>

            <Section title="Como Usar">
                <Step number="1" title="Instalar">
                    Faz download pela Steam (gratuito: "3DMark Demo").
                </Step>
                <Step number="2" title="Escolher Teste">
                    Na lista de benchmarks, seleciona Time Spy.
                </Step>
                <Step number="3" title="Configurar">
                    Na versão grátis, usa "Default" settings.
                    Na paga, podes personalizar.
                </Step>
                <Step number="4" title="Executar">
                    Clica "Run" e aguarda ~5 minutos.
                </Step>
                <Step number="5" title="Resultado">
                    Mostra Graphics Score, CPU Score e Overall.
                    Compara no site 3dmark.com.
                </Step>
            </Section>

            <Section title="Stress Test (Versão Paga)">
                <p>
                    O stress test corre o benchmark 20 vezes em loop:
                </p>
                <Step number="1" title="Ativar">
                    Seleciona "Stress test" em vez de "Benchmark".
                </Step>
                <Step number="2" title="Duração">
                    Demora ~20-30 minutos.
                </Step>
                <Step number="3" title="Resultado">
                    Mostra Frame stability % - acima de 97% é considerado estável.
                </Step>
                <Tip>
                    O stress test é excelente para validar OC de GPU.
                    Variação pequena de FPS = sistema estável.
                </Tip>
            </Section>

            <Section title="Interpretar Scores">
                <p>Scores típicos Time Spy para referência:</p>
                <ConfigList items={[
                    { field: 'RTX 4090', value: '~36,000 Graphics' },
                    { field: 'RTX 4080', value: '~28,000 Graphics' },
                    { field: 'RTX 4070 Ti', value: '~22,000 Graphics' },
                    { field: 'RX 7900 XTX', value: '~29,000 Graphics' },
                    { field: 'RTX 3080', value: '~17,000 Graphics' },
                    { field: 'RTX 3060', value: '~8,500 Graphics' },
                ]} />
            </Section>

            <Section title="Comparar Resultados">
                <Step number="1" title="Criar Conta">
                    Regista em 3dmark.com para guardar resultados.
                </Step>
                <Step number="2" title="Comparar">
                    O site mostra percentil - onde te situas vs outros sistemas.
                </Step>
                <Step number="3" title="Hall of Fame">
                    Vê os melhores scores mundiais para cada hardware.
                </Step>
            </Section>

            <Section title="Medir Ganhos de OC">
                <Step number="1" title="Stock">
                    Corre Time Spy em stock. Anota Graphics Score.
                </Step>
                <Step number="2" title="Overclock">
                    Aplica OC e corre novamente.
                </Step>
                <Step number="3" title="Calcular">
                    A diferença percentual é o teu ganho real em gaming.
                </Step>
                <Tip>
                    Espera 3-8% de ganho típico em OC de GPU.
                    Mais de 10% é excelente!
                </Tip>
            </Section>
        </GuideLayout>
    )
}

export default ThreeDMark
