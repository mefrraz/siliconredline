// =====================================================
// OCCT GUIDE - Comprehensive Stress Testing
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const Occt = ({ onBack }) => {
    return (
        <GuideLayout
            title="OCCT"
            subtitle="Suite completa de stress test para CPU, GPU, RAM e PSU"
            difficulty="Médio"
            readTime="12 min"
            onBack={onBack}
        >
            <Section title="O que é o OCCT?">
                <p>
                    O OCCT (OverClock Checking Tool) é uma <strong>suite completa</strong> de
                    stress tests. Consegue testar CPU, GPU, RAM e até a fonte de alimentação
                    em simultâneo.
                </p>
                <p>
                    Distingue-se por detetar erros automaticamente e ter níveis de intensidade
                    configuráveis.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a ocbase.com e faz download da versão gratuita.
                </Step>
                <Step number="2" title="Instalar">
                    Executa o instalador. A versão gratuita tem pequenas limitações mas é suficiente.
                </Step>
            </Section>

            <Section title="Interface Principal">
                <p>O OCCT tem várias abas de teste:</p>
                <ConfigList items={[
                    { field: 'CPU: OCCT', value: 'Stress test de CPU com deteção de erros' },
                    { field: 'CPU: Linpack', value: 'Variante extremamente intensiva' },
                    { field: 'Memory', value: 'Teste de RAM (encontra erros de OC)' },
                    { field: '3D', value: 'Stress test de GPU' },
                    { field: 'Power', value: 'Stress em CPU+GPU - testa PSU' },
                ]} />
            </Section>

            <Section title="CPU: OCCT Test">
                <p>O teste de CPU principal com opções:</p>
                <ConfigList items={[
                    { field: 'Data Set', value: 'Small (cache), Medium, Large (RAM)' },
                    { field: 'Mode', value: 'Normal, Steady (constante)' },
                    { field: 'Load Type', value: 'Variable ou Steady' },
                    { field: 'Instruction Set', value: 'Auto, AVX, AVX2, AVX512' },
                ]} />
                <Step number="1" title="Configurar">
                    Para OC de CPU, usa Data Set "Small" e Instruction Set "Auto".
                </Step>
                <Step number="2" title="Iniciar">
                    Clica no grande botão verde para começar.
                </Step>
                <Tip>
                    AVX e AVX2 geram muito mais calor. Se o OC falha apenas em AVX,
                    considera AVX offset no BIOS.
                </Tip>
            </Section>

            <Section title="CPU: Linpack">
                <p>Versão ainda mais intensa que OCCT normal:</p>
                <ConfigList items={[
                    { field: 'AVX Capable Linpack', value: 'Usa instruções AVX (muito quente)' },
                    { field: 'Memory', value: 'Quantidade de RAM a usar no teste' },
                ]} />
                <Warning>
                    Linpack com AVX é EXTREMAMENTE intenso. Monitoriza temperaturas de perto.
                    Não é representativo de uso real.
                </Warning>
            </Section>

            <Section title="Memory Test">
                <p>Para testar estabilidade de RAM overclockada:</p>
                <Step number="1" title="Configurar">
                    Escolhe quantidade de memória a testar (80-90% está bem).
                </Step>
                <Step number="2" title="Executar">
                    O teste demora bastante - 1 hora mínimo recomendado.
                </Step>
                <Step number="3" title="Erros">
                    Qualquer erro indicado significa OC de RAM instável.
                </Step>
            </Section>

            <Section title="3D (GPU Test)">
                <p>Stress test para placa gráfica:</p>
                <ConfigList items={[
                    { field: 'Shader Complexity', value: '1-8, maior = mais stress' },
                    { field: 'Resolution', value: 'Maior resolução = mais trabalho para GPU' },
                ]} />
            </Section>

            <Section title="Power Supply Test">
                <p>
                    Testa a fonte de alimentação ao stressar CPU + GPU simultaneamente:
                </p>
                <ConfigList items={[
                    { field: 'Uso', value: 'Detecta PSU subdimensionada' },
                    { field: 'Sintomas', value: 'Crashes, shutdowns, instabilidade' },
                    { field: 'Duração', value: '15-30 minutos' },
                ]} />
            </Section>

            <Section title="Deteção de Erros">
                <p>O OCCT deteta erros automaticamente:</p>
                <ConfigList items={[
                    { field: 'Barra verde', value: 'Sem erros detetados' },
                    { field: 'Barra laranja', value: 'Avisos - possível instabilidade' },
                    { field: 'Barra vermelha', value: 'Erros detetados - OC instável' },
                    { field: 'Contador de erros', value: 'Mostra número total de erros' },
                ]} />
            </Section>

            <Section title="Duração Recomendada">
                <ConfigList items={[
                    { field: '15 min', value: 'Teste rápido durante ajustes' },
                    { field: '1 hora', value: 'Validação básica de estabilidade' },
                    { field: '4 horas', value: 'Validação sólida' },
                    { field: '8+ horas', value: 'Máxima confiança' },
                ]} />
            </Section>

            <Warning>
                OCCT pode revelar instabilidades que outros testes não encontram.
                Se passar 1 hora sem erros, o OC está provavelmente estável para uso diário.
            </Warning>
        </GuideLayout>
    )
}

export default Occt
