// =====================================================
// GPU OVERCLOCK GUIDE - Complete Methodology
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const OcGpu = ({ onBack }) => {
    return (
        <GuideLayout
            title="Overclock de GPU"
            subtitle="Metodologia completa para overclock seguro de placas gráficas"
            difficulty="Médio"
            readTime="20 min"
            onBack={onBack}
        >
            <Section title="Princípios do Overclock de GPU">
                <p>
                    O overclock de GPU consiste em aumentar as frequências do núcleo (Core) e da
                    memória (VRAM) além dos valores de fábrica para obter mais performance gráfica.
                </p>
                <p>
                    <strong>Ganhos típicos:</strong> 5-15% mais FPS, variando por jogo e GPU.
                </p>
                <ConfigList items={[
                    { field: 'Core Clock', value: 'Afeta performance geral de renderização' },
                    { field: 'Memory Clock', value: 'Afeta largura de banda (texturas, 4K)' },
                    { field: 'Power Limit', value: 'Quanta energia a GPU pode consumir' },
                    { field: 'Temperature', value: 'Limite térmico antes de throttling' },
                ]} />
            </Section>

            <Warning>
                GPUs modernas são muito seguras para OC - o pior que pode acontecer é um crash/driver
                reset. A GPU protege-se automaticamente de danos. No entanto, temperaturas excessivas
                constantes (&gt;90°C) podem reduzir a vida útil.
            </Warning>

            <Section title="Ferramentas Necessárias">
                <ConfigList items={[
                    { field: 'MSI Afterburner', value: 'Software principal de OC (ver guia dedicado)' },
                    { field: 'HWiNFO64', value: 'Monitorização detalhada' },
                    { field: '3DMark', value: 'Benchmark para testar estabilidade' },
                    { field: 'Unigine Heaven/Superposition', value: 'Stress test gratuito' },
                    { field: 'CapFrameX', value: 'Medir FPS em jogos reais (opcional)' },
                ]} />
            </Section>

            <Section title="Metodologia de OC - Passo a Passo">
                <Step number="1" title="Baseline">
                    Antes de fazer qualquer alteração, corre um benchmark (3DMark TimeSpy ou Heaven)
                    e anota: score, FPS médio, temperatura máxima, clock médio durante o teste.
                </Step>
                <Step number="2" title="Aumentar Power Limit">
                    Abre MSI Afterburner. Aumenta Power Limit para <Code>110-120%</Code>.
                    Isto dá margem para a GPU consumir mais energia quando precisa.
                </Step>
                <Step number="3" title="Core Clock +50MHz">
                    Adiciona <Code>+50 MHz</Code> ao Core Clock. Aplica (botão ✓) e corre o
                    benchmark durante 5 minutos. Observa se há crashes ou artefactos.
                </Step>
                <Step number="4" title="Incrementar Core">
                    Se estável, adiciona mais <Code>+25 MHz</Code>. Testa de novo. Repete
                    até encontrar instabilidade (crash, artefactos, driver timeout).
                </Step>
                <Step number="5" title="Recuar para Segurança">
                    Quando encontrares o limite, recua <Code>-25 a -50 MHz</Code> para teres
                    margem de segurança para uso diário.
                </Step>
                <Step number="6" title="Memory Clock">
                    Com Core estável, aumenta Memory Clock em incrementos de <Code>+100 MHz</Code>.
                    Testa após cada aumento.
                </Step>
                <Step number="7" title="Validar Memory">
                    A memória é traiçoeira - pode parecer estável mas ter correção de erros interna
                    que reduz performance. Compara benchmarks: se o score diminuir com Memory mais
                    alto, ela está a corrigir erros. Recua.
                </Step>
                <Step number="8" title="Stress Test Final">
                    Corre um jogo exigente ou Heaven/Superposition durante 30+ minutos.
                    Se estável e temps OK (&lt;85°C), o OC está pronto.
                </Step>
            </Section>

            <Section title="Undervolting - Alternativa ao OC">
                <p>
                    Em vez de aumentar clocks, podes <strong>reduzir voltagem</strong> mantendo
                    os mesmos clocks. Resultado: menos calor, menos ruído, por vezes até mais
                    performance (porque a GPU não faz thermal throttling).
                </p>
                <ConfigList items={[
                    { field: 'Onde fazer', value: 'MSI Afterburner → Curva de Voltagem (Ctrl+F)' },
                    { field: 'Como funciona', value: 'Define o clock que queres para uma voltagem mais baixa' },
                    { field: 'Ganho típico', value: '5-10°C menos temperatura' },
                ]} />
                <Tip title="Para Quem é">
                    Undervolting é ideal para quem tem GPU em case pequeno, laptop, ou simplesmente
                    quer PC mais silencioso sem sacrificar performance.
                </Tip>
            </Section>

            <Section title="Sinais de Instabilidade">
                <ConfigList items={[
                    { field: 'Driver timeout/reset', value: 'Tela preta por segundos, depois volta' },
                    { field: 'Artefactos', value: 'Linhas, pontos, texturas corrompidas' },
                    { field: 'Crash para desktop', value: 'Jogo/benchmark fecha subitamente' },
                    { field: 'BSOD', value: 'Raro, mas pode acontecer' },
                    { field: 'Throttling', value: 'Clocks caem durante o teste (temp alta)' },
                ]} />
            </Section>

            <Section title="Dicas por Marca">
                <p><strong>NVIDIA RTX 30/40 Series:</strong></p>
                <ConfigList items={[
                    { field: 'Core típico', value: '+100 a +200 MHz' },
                    { field: 'Memory típico', value: '+500 a +1000 MHz (GDDR6X)' },
                    { field: 'Power Limit', value: '110-115% (limite do design)' },
                    { field: 'Nota', value: 'GPU Boost 4.0 ajusta automaticamente baseado em temp' },
                ]} />

                <p><strong>AMD RX 6000/7000 Series:</strong></p>
                <ConfigList items={[
                    { field: 'Core típico', value: '+50 a +150 MHz' },
                    { field: 'Memory típico', value: '+50 a +150 MHz (Fast Timing ajuda)' },
                    { field: 'Power Limit', value: '+15% típico' },
                    { field: 'Nota', value: 'AMD permite undervolting mais agressivo' },
                ]} />
            </Section>

            <Section title="Otimização de Curva de Ventoinha">
                <p>
                    Uma boa curva de ventoinha equilibra ruído e temperaturas:
                </p>
                <ConfigList items={[
                    { field: '40°C', value: '30% - Silencioso em idle' },
                    { field: '50°C', value: '40%' },
                    { field: '60°C', value: '55%' },
                    { field: '70°C', value: '75%' },
                    { field: '80°C', value: '100% - Máximo arrefecimento' },
                ]} />
                <Tip>
                    Acede à curva em MSI Afterburner clicando no ícone de ventoinha.
                    Ativa "User Defined" para curva personalizada.
                </Tip>
            </Section>

            <Section title="Guardar e Aplicar OC">
                <Step number="1">Em MSI Afterburner, clica no ícone de disquete para guardar perfil.</Step>
                <Step number="2">Seleciona um slot (1-5) clicando no número.</Step>
                <Step number="3">
                    Para aplicar ao iniciar Windows: Settings → General → "Apply overclocking at system startup".
                </Step>
                <Step number="4">
                    Opcional: cria atalhos de teclado para trocar entre perfis rapidamente.
                </Step>
            </Section>
        </GuideLayout>
    )
}

export default OcGpu
