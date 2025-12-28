// =====================================================
// UNIGINE HEAVEN GUIDE - GPU Benchmark
// =====================================================

import GuideLayout, { Section, Step, Tip, ConfigList } from './GuideLayout'

const UnigineHeaven = ({ onBack }) => {
    return (
        <GuideLayout
            title="Unigine Heaven"
            subtitle="Benchmark gratuito de GPU com modo de stress test contínuo"
            difficulty="Iniciante"
            readTime="6 min"
            onBack={onBack}
        >
            <Section title="O que é o Unigine Heaven?">
                <p>
                    O Unigine Heaven é um <strong>benchmark de GPU gratuito</strong> que renderiza
                    uma cena de fantasia detalhada. É popular para testar estabilidade de overclock
                    porque pode correr em loop indefinidamente.
                </p>
                <p>
                    Ao contrário do FurMark, usa carga mais realista, parecida com jogos reais.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a benchmark.unigine.com/heaven e faz download da versão "Free".
                </Step>
                <Step number="2" title="Instalar">
                    Executa o instalador - é rápido.
                </Step>
            </Section>

            <Section title="Configurações">
                <p>Antes de iniciar, configura na janela de lançamento:</p>
                <ConfigList items={[
                    { field: 'Preset', value: 'Custom (para controlo total) ou Extreme' },
                    { field: 'Quality', value: 'Ultra para stress máximo' },
                    { field: 'Tessellation', value: 'Extreme testa bem a GPU' },
                    { field: 'Anti-aliasing', value: '8x para mais carga' },
                    { field: 'Resolution', value: 'A tua resolução nativa' },
                    { field: 'Fullscreen', value: 'Marca para resultados consistentes' },
                ]} />
            </Section>

            <Section title="Modos de Uso">
                <ConfigList items={[
                    { field: 'Benchmark', value: 'Corre uma vez e dá score - para comparações' },
                    { field: 'Loop (sem benchmark)', value: 'Corre infinitamente - para stress test' },
                ]} />
                <Tip>
                    Para testar estabilidade de OC, usa o modo <strong>loop</strong> sem clicar
                    em "Benchmark". Deixa correr 30+ minutos.
                </Tip>
            </Section>

            <Section title="Como Testar Estabilidade">
                <Step number="1" title="Configurar">
                    Escolhe preset "Extreme" ou Quality "Ultra" + AA 8x.
                </Step>
                <Step number="2" title="Iniciar">
                    Clica "Run" - não cliques em "Benchmark".
                </Step>
                <Step number="3" title="Monitorizar">
                    Abre HWiNFO ou GPU-Z para ver temperaturas.
                </Step>
                <Step number="4" title="Observar">
                    Procura artefactos visuais, flickering ou crashes.
                </Step>
                <Step number="5" title="Duração">
                    30 minutos sem problemas = provavelmente estável.
                </Step>
            </Section>

            <Section title="O que Procurar">
                <ConfigList items={[
                    { field: 'Artefactos', value: 'Pixels coloridos, linhas - memory OC instável' },
                    { field: 'Flickering', value: 'Flashes, texturas a piscar - core instável' },
                    { field: 'Driver crash', value: 'Ecrã negro momentâneo + mensagem - OC muito alto' },
                    { field: 'Freeze/crash', value: 'Sistema para - OC definitivamente instável' },
                    { field: 'FPS muito baixo', value: 'Possível throttling térmico ou power limit' },
                ]} />
            </Section>

            <Section title="Modo Benchmark">
                <p>Para obter um score comparável:</p>
                <Step number="1" title="Configurar">
                    Usa um preset standard (Extreme) para resultados comparáveis.
                </Step>
                <Step number="2" title="Correr">
                    Clica "Benchmark" - corre por ~1 minuto.
                </Step>
                <Step number="3" title="Resultado">
                    Mostra FPS médio e score. Guarda para comparar antes/depois de OC.
                </Step>
            </Section>

            <Section title="Alternativa: Superposition">
                <p>
                    A Unigine também tem o benchmark "Superposition" mais moderno:
                </p>
                <ConfigList items={[
                    { field: 'Gráficos', value: 'Mais modernos e exigentes' },
                    { field: 'Presets', value: '720p Low até 8K Optimized' },
                    { field: 'VR Ready', value: 'Inclui teste para VR' },
                ]} />
                <Tip>
                    Para GPUs recentes (RTX 30/40, RX 6000/7000), o Superposition
                    é mais relevante que o Heaven.
                </Tip>
            </Section>
        </GuideLayout>
    )
}

export default UnigineHeaven
