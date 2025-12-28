// =====================================================
// PRIME95 GUIDE - CPU Stress Testing
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const Prime95 = ({ onBack }) => {
    return (
        <GuideLayout
            title="Prime95"
            subtitle="O teste de stress mais rigoroso para CPUs - validação de estabilidade"
            difficulty="Médio"
            readTime="12 min"
            onBack={onBack}
        >
            <Section title="O que é o Prime95?">
                <p>
                    O Prime95 é o <strong>stress test de CPU mais intenso</strong> disponível.
                    Originalmente criado para encontrar números primos, tornou-se no padrão
                    para testar estabilidade de overclock.
                </p>
                <p>
                    Se o teu overclock sobreviver ao Prime95, é considerado estável para
                    qualquer uso normal.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a mersenne.org/download e escolhe a versão Windows 64-bit.
                </Step>
                <Step number="2" title="Extrair">
                    É um programa portable - extrai para uma pasta e executa prime95.exe.
                </Step>
                <Step number="3" title="Primeiro Início">
                    Quando perguntar sobre "Join GIMPS", clica "Just Stress Testing".
                </Step>
            </Section>

            <Section title="Tipos de Teste">
                <p>Vai a Options → Torture Test para escolher o tipo:</p>
                <ConfigList items={[
                    { field: 'Small FFTs', value: 'Máximo stress em CPU/cache - melhor para testar estabilidade' },
                    { field: 'Large FFTs', value: 'Stress em CPU + RAM - bom para testar memória também' },
                    { field: 'Blend', value: 'Mix de todos - teste mais realista mas menos intenso' },
                    { field: 'Custom', value: 'Configuração manual de tamanho de FFT' },
                ]} />
                <Tip>
                    Para validar overclock de CPU, usa <strong>Small FFTs</strong>.
                    Para testar overclock de RAM também, usa <strong>Large FFTs</strong>.
                </Tip>
            </Section>

            <Section title="Como Usar">
                <Step number="1" title="Preparar">
                    Abre HWiNFO para monitorizar temperaturas. Reseta as estatísticas.
                </Step>
                <Step number="2" title="Iniciar Teste">
                    Vai a Options → Torture Test → Small FFTs → OK.
                </Step>
                <Step number="3" title="Monitorizar">
                    Observa as temperaturas no HWiNFO. Não devem passar de 95°C.
                </Step>
                <Step number="4" title="Verificar Erros">
                    O Prime95 mostra "FATAL ERROR" ou "Hardware Error" se houver instabilidade.
                </Step>
                <Step number="5" title="Parar">
                    Vai a Test → Stop para terminar. Verifica se todos os threads passaram.
                </Step>
            </Section>

            <Section title="Duração Recomendada">
                <ConfigList items={[
                    { field: '5-10 min', value: 'Teste rápido - encontra instabilidades óbvias' },
                    { field: '30 min', value: 'Teste básico - bom para ajustes iniciais' },
                    { field: '1-2 horas', value: 'Teste sólido - recomendado para validar OC' },
                    { field: '8+ horas', value: 'Teste completo - máxima confiança' },
                ]} />
            </Section>

            <Section title="Interpretar Resultados">
                <ConfigList items={[
                    { field: 'Worker stopped', value: 'Erro de hardware - OC instável' },
                    { field: 'FATAL ERROR', value: 'Instabilidade detetada - reduz OC ou aumenta voltagem' },
                    { field: 'Rounding error', value: 'Erro de cálculo - geralmente problema de voltagem' },
                    { field: 'Temps muito altas', value: 'Arrefecimento insuficiente - reduz OC ou melhora cooler' },
                ]} />
            </Section>

            <Section title="Configurações Avançadas">
                <p>Em Options → Torture Test → Custom:</p>
                <ConfigList items={[
                    { field: 'Min FFT size', value: '8K para stress máximo em cache L1/L2' },
                    { field: 'Max FFT size', value: '8K-128K para CPU, 128K+ inclui RAM' },
                    { field: 'Run FFTs in-place', value: 'Marca para stress máximo' },
                    { field: 'Time to run each FFT', value: 'Minutos por teste - 3-15 é normal' },
                ]} />
            </Section>

            <Section title="Alternativas Menos Intensas">
                <p>
                    O Prime95 é extremamente intenso - mais do que qualquer uso real.
                    Alternativas mais realistas:
                </p>
                <ConfigList items={[
                    { field: 'OCCT', value: 'Intenso mas com mais opções de configuração' },
                    { field: 'Cinebench Loop', value: 'Carga real de rendering' },
                    { field: 'Gaming 2+ horas', value: 'Teste mais próximo do uso real' },
                ]} />
            </Section>

            <Warning>
                O Prime95 gera calor EXTREMO. Monitoriza temperaturas constantemente.
                Se passares dos 95°C, para imediatamente. Nunca deixes sem supervisão nas primeiras horas.
            </Warning>

            <Tip>
                Um OC que falha no Prime95 mas funciona em jogos pode ser aceitável para uso diário.
                Prime95 é mais rigoroso do que a maioria dos workloads reais.
            </Tip>
        </GuideLayout>
    )
}

export default Prime95
