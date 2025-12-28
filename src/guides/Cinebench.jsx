// =====================================================
// CINEBENCH R23 GUIDE - CPU Benchmark
// =====================================================

import GuideLayout, { Section, Step, Tip, ConfigList } from './GuideLayout'

const Cinebench = ({ onBack }) => {
    return (
        <GuideLayout
            title="Cinebench R23"
            subtitle="Benchmark de CPU baseado em rendering real - single e multi-core"
            difficulty="Iniciante"
            readTime="7 min"
            onBack={onBack}
        >
            <Section title="O que é o Cinebench?">
                <p>
                    O Cinebench é um benchmark de CPU desenvolvido pela Maxon, criadores do Cinema 4D.
                    Usa o motor de rendering real para testar performance, tornando-o num dos
                    <strong> benchmarks mais respeitados</strong> da indústria.
                </p>
                <p>
                    É perfeito para medir ganhos de overclock pois os resultados são
                    diretamente comparáveis.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a maxon.net/cinebench ou procura "Cinebench" na Microsoft Store.
                </Step>
                <Step number="2" title="Instalar">
                    Extrai o ZIP ou instala pela Store - ambos funcionam igual.
                </Step>
            </Section>

            <Section title="Tipos de Teste">
                <ConfigList items={[
                    { field: 'CPU (Multi Core)', value: 'Usa TODOS os cores - mede performance máxima' },
                    { field: 'CPU (Single Core)', value: 'Usa apenas 1 core - mede IPC e frequência' },
                ]} />
                <Tip>
                    O teste <strong>Single Core</strong> é mais sensível a overclock de frequência.
                    <strong>Multi Core</strong> beneficia mais de efficiency cores e thread count.
                </Tip>
            </Section>

            <Section title="Como Usar">
                <Step number="1" title="Preparar">
                    Fecha outras aplicações para resultados consistentes.
                </Step>
                <Step number="2" title="Escolher Teste">
                    Clica "Start" ao lado de CPU (Multi Core) ou CPU (Single Core).
                </Step>
                <Step number="3" title="Aguardar">
                    O teste demora ~10 minutos para Multi e ~3 min para Single.
                </Step>
                <Step number="4" title="Ver Resultado">
                    O score aparece no lado esquerdo. Maior = melhor.
                </Step>
            </Section>

            <Section title="Resultados de Referência">
                <p>Scores típicos para comparação:</p>
                <ConfigList items={[
                    { field: 'i9-14900K', value: '~40,000 Multi / ~2,300 Single' },
                    { field: 'i7-14700K', value: '~35,000 Multi / ~2,200 Single' },
                    { field: 'Ryzen 9 7950X', value: '~38,000 Multi / ~2,100 Single' },
                    { field: 'Ryzen 7 7800X3D', value: '~18,000 Multi / ~1,900 Single' },
                    { field: 'i5-13600K', value: '~24,000 Multi / ~2,100 Single' },
                    { field: 'Ryzen 5 7600X', value: '~15,000 Multi / ~1,950 Single' },
                ]} />
            </Section>

            <Section title="Stability Test Mode">
                <p>
                    O Cinebench pode correr em loop para testar estabilidade:
                </p>
                <Step number="1" title="Ativar">
                    Vai a File → Preferences → "Minimum Test Duration" e define tempo.
                </Step>
                <Step number="2" title="Executar">
                    O teste repete até completar a duração definida.
                </Step>
                <Step number="3" title="Verificar">
                    Se o score variar muito ou crashar, o OC pode estar instável.
                </Step>
                <Tip>
                    Um loop de 30 minutos é um bom teste de estabilidade que simula workload real.
                </Tip>
            </Section>

            <Section title="Throttling Detection">
                <p>
                    Compara o teu score com referências online. Se estiver muito abaixo:
                </p>
                <ConfigList items={[
                    { field: 'Score baixo', value: 'Possível throttling térmico ou power limit' },
                    { field: 'Score inconsistente', value: 'OC instável ou background processes' },
                    { field: 'Crash durante teste', value: 'OC definitivamente instável' },
                ]} />
            </Section>

            <Section title="Comparar Antes/Depois">
                <p>
                    Para medir ganhos de OC:
                </p>
                <Step number="1" title="Antes">
                    Corre benchmark em stock. Anota os scores.
                </Step>
                <Step number="2" title="Depois">
                    Aplica OC e corre novamente.
                </Step>
                <Step number="3" title="Calcular">
                    (Score OC - Score Stock) ÷ Score Stock × 100 = % ganho
                </Step>
            </Section>
        </GuideLayout>
    )
}

export default Cinebench
