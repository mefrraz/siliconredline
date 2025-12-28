// =====================================================
// FURMARK GUIDE - GPU Stress Testing
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const FurMark = ({ onBack }) => {
    return (
        <GuideLayout
            title="FurMark"
            subtitle="Stress test térmico para GPUs - testa limites de temperatura e estabilidade"
            difficulty="Iniciante"
            readTime="8 min"
            onBack={onBack}
        >
            <Section title="O que é o FurMark?">
                <p>
                    O FurMark é um <strong>stress test de GPU</strong> que renderiza um "donut"
                    peludo extremamente exigente. É conhecido como "GPU burner" porque leva
                    a placa gráfica ao limite térmico absoluto.
                </p>
                <p>
                    É útil para testar arrefecimento, estabilidade de overclock e
                    identificar problemas térmicos.
                </p>
            </Section>

            <Section title="Download e Instalação">
                <Step number="1" title="Download">
                    Vai a geeks3d.com/furmark e faz download da versão mais recente.
                </Step>
                <Step number="2" title="Instalar">
                    Executa o instalador - é rápido e simples.
                </Step>
            </Section>

            <Section title="Configurações Principais">
                <p>Na janela principal, configura antes de iniciar:</p>
                <ConfigList items={[
                    { field: 'Resolution', value: 'Usa a tua resolução nativa ou 1920x1080' },
                    { field: 'Fullscreen', value: 'Marca para stress máximo' },
                    { field: 'Anti-aliasing', value: '8X MSAA para mais carga' },
                    { field: 'Duration', value: 'Define tempo limite (0 = infinito)' },
                    { field: 'GPU temperature alarm', value: 'Define temp máxima para parar automaticamente' },
                ]} />
            </Section>

            <Section title="Como Usar">
                <Step number="1" title="Preparar Monitorização">
                    Abre HWiNFO ou GPU-Z para monitorizar temperaturas em paralelo.
                </Step>
                <Step number="2" title="Configurar Alarme">
                    Define "GPU temperature alarm" para 85-90°C como segurança.
                </Step>
                <Step number="3" title="Iniciar">
                    Clica em "GPU stress test" para começar.
                </Step>
                <Step number="4" title="Observar">
                    Vê a temperatura subir rapidamente. Estabiliza após 2-3 minutos.
                </Step>
                <Step number="5" title="Verificar">
                    Se houver artefactos visuais ou crash, o OC é instável.
                </Step>
            </Section>

            <Section title="Duração Recomendada">
                <ConfigList items={[
                    { field: '5 minutos', value: 'Teste rápido de temperaturas' },
                    { field: '15 minutos', value: 'Verificação básica de estabilidade' },
                    { field: '30 minutos', value: 'Teste sólido para validar OC' },
                    { field: '1 hora', value: 'Teste completo para máxima confiança' },
                ]} />
            </Section>

            <Section title="Interpretar Resultados">
                <ConfigList items={[
                    { field: 'Crash/freeze', value: 'Overclock instável - reduz clocks ou aumenta voltagem' },
                    { field: 'Artefactos visuais', value: 'Memória instável - reduz memory clock' },
                    { field: 'Temp > 85°C', value: 'Arrefecimento insuficiente ou OC demasiado alto' },
                    { field: 'Throttling', value: 'GPU está a reduzir clocks - verifica power limit' },
                    { field: 'Estável 30+ min', value: 'Provavelmente estável para uso diário' },
                ]} />
            </Section>

            <Section title="Benchmark Mode">
                <p>
                    Além de stress test, o FurMark tem um modo benchmark:
                </p>
                <Step number="1" title="Preset">
                    Escolhe um preset (720p, 1080p, 4K) para resultados comparáveis.
                </Step>
                <Step number="2" title="Executar">
                    Clica em "GPU benchmark" - corre por tempo fixo.
                </Step>
                <Step number="3" title="Comparar">
                    O score permite comparar antes/depois de OC ou com outros sistemas.
                </Step>
            </Section>

            <Warning>
                O FurMark é EXTREMAMENTE intenso - mais do que qualquer jogo real.
                Causa mais calor do que uso normal. Não uses por longos períodos.
                Monitoriza sempre as temperaturas!
            </Warning>

            <Section title="Alternativas">
                <p>Para testes menos extremos mas mais realistas:</p>
                <ConfigList items={[
                    { field: 'Unigine Heaven/Superposition', value: 'Stress moderado, mais parecido com jogos' },
                    { field: '3DMark Stress Test', value: 'Ciclos de benchmark repetidos' },
                    { field: 'Gaming prolongado', value: 'O teste mais realista de todos' },
                ]} />
            </Section>

            <Tip>
                Se o teu OC passa em jogos mas falha no FurMark, pode ainda ser
                estável para uso diário. O FurMark é artificialmente intenso.
            </Tip>
        </GuideLayout>
    )
}

export default FurMark
