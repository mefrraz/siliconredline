// =====================================================
// INTEL XTU GUIDE - Software Tutorial
// =====================================================
// Focus: How to use the software, interface explanation
// OC methodology is in the Intel CPU OC guide

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const IntelXtu = ({ onBack }) => {
    return (
        <GuideLayout
            title="Intel Extreme Tuning Utility"
            subtitle="Tutorial completo do software - interface, funcionalidades e benchmarks"
            difficulty="Iniciante"
            readTime="10 min"
            onBack={onBack}
        >
            <Section title="O que é o Intel XTU?">
                <p>
                    O Intel XTU (Extreme Tuning Utility) é a ferramenta oficial da Intel para
                    monitorização, benchmarking e overclock de processadores desbloqueados (série K/KF).
                </p>
                <p>
                    Este guia foca-se em <strong>como usar o software</strong>. Para metodologia
                    de overclock, consulta o <strong>Guia de Overclock CPU Intel</strong>.
                </p>
            </Section>

            <Section title="Download e Instalação">
                <Step number="1" title="Download">
                    Procura "Intel XTU" no Google ou vai diretamente ao site da Intel.
                </Step>
                <Step number="2" title="Requisitos">
                    Requer CPU Intel Core de 6ª geração ou posterior. Funcionalidade completa
                    requer série K/KF e motherboard Z-series.
                </Step>
                <Step number="3" title="Instalação">
                    Executa o instalador. Reinicia após instalação.
                </Step>
            </Section>

            <Section title="Interface Principal - Abas">
                <p>
                    O XTU está organizado em abas na parte superior:
                </p>
                <ConfigList items={[
                    { field: 'System Information', value: 'Info detalhada do CPU e sistema' },
                    { field: 'Basic Tuning', value: 'Controlos simplificados de OC' },
                    { field: 'Advanced Tuning', value: 'Controlos detalhados por core' },
                    { field: 'Stress Test', value: 'Benchmark e teste de estabilidade' },
                    { field: 'Benchmarking', value: 'Teste de performance com score' },
                    { field: 'Profiles', value: 'Guardar e carregar configurações' },
                ]} />
            </Section>

            <Section title="System Information">
                <p>
                    Esta aba mostra informações detalhadas:
                </p>
                <ConfigList items={[
                    { field: 'Processor', value: 'Modelo, cores, threads, cache' },
                    { field: 'Graphics', value: 'GPU integrada (se aplicável)' },
                    { field: 'Memory', value: 'Quantidade e velocidade da RAM' },
                    { field: 'Motherboard', value: 'Modelo e versão da BIOS' },
                ]} />
            </Section>

            <Section title="Basic Tuning">
                <p>
                    Controlos simplificados para ajustes rápidos:
                </p>
                <ConfigList items={[
                    { field: 'Processor Core Ratio', value: 'Multiplicador para todos os P-Cores' },
                    { field: 'Processor Cache Ratio', value: 'Multiplicador do Ring/Cache' },
                    { field: 'Core Voltage Offset', value: 'Ajuste de voltagem (+/- mV)' },
                    { field: 'Turbo Boost Power Max', value: 'PL1 - limite de potência sustentada' },
                    { field: 'Turbo Boost Short Power Max', value: 'PL2 - limite de potência burst' },
                ]} />

                <p>
                    <strong>O que cada valor significa</strong> está explicado no
                    <strong> Guia de Overclock CPU Intel</strong>.
                </p>
            </Section>

            <Section title="Advanced Tuning">
                <p>
                    Controlos detalhados para ajuste fino:
                </p>
                <ConfigList items={[
                    { field: 'Per-Core Ratio', value: 'Multiplicador individual por core' },
                    { field: 'P-Core / E-Core Ratios', value: 'Controlo separado por tipo de core' },
                    { field: 'Voltage Settings', value: 'Modos: Adaptive, Offset, Override' },
                    { field: 'AVX Ratio Offset', value: 'Redução de ratio para cargas AVX' },
                    { field: 'Power Limits', value: 'PL1, PL2, Tau, IccMax individual' },
                ]} />

                <Tip>
                    A maioria dos utilizadores deve usar "Basic Tuning". Advanced é para
                    ajuste fino após encontrares settings base estáveis.
                </Tip>
            </Section>

            <Section title="Stress Test">
                <p>
                    Testa estabilidade do CPU sob carga:
                </p>
                <ConfigList items={[
                    { field: 'CPU Stress Test', value: 'Carga pesada todos os cores' },
                    { field: 'Duration', value: 'Escolhe quanto tempo correr (5-60 min)' },
                    { field: 'Memory Stress', value: 'Teste de stress à memória' },
                    { field: 'Start', value: 'Inicia o teste' },
                ]} />

                <Warning>
                    O stress test do XTU é menos intenso que Prime95 ou OCCT.
                    Se passares aqui, ainda deves testar com outras ferramentas.
                </Warning>
            </Section>

            <Section title="Benchmarking">
                <p>
                    Benchmark integrado para medir performance:
                </p>
                <Step number="1" title="Run Benchmark">
                    Clica "Run Benchmark" e espera que complete (~5 minutos).
                </Step>
                <Step number="2" title="Score">
                    O resultado é um número - maior é melhor. Compara antes/depois de OC.
                </Step>
                <Step number="3" title="Histórico">
                    O XTU guarda resultados anteriores para comparação.
                </Step>

                <Tip>
                    Corre o benchmark stock primeiro e anota. Depois de OC, compara
                    para ver a melhoria percentual.
                </Tip>
            </Section>

            <Section title="Monitorização em Tempo Real">
                <p>
                    O painel inferior mostra dados em tempo real:
                </p>
                <ConfigList items={[
                    { field: 'Package Temperature', value: 'Temperatura do CPU (°C)' },
                    { field: 'Core Frequency', value: 'Clock atual de cada core' },
                    { field: 'Core Voltage', value: 'VCore em tempo real' },
                    { field: 'Power', value: 'Consumo atual em Watts' },
                    { field: 'Thermal Throttling', value: 'Indica se está a limitar por temp' },
                    { field: 'Power Throttling', value: 'Indica se está a limitar por potência' },
                ]} />
            </Section>

            <Section title="Profiles">
                <p>
                    Guarda e gere configurações:
                </p>
                <Step number="1" title="Save Profile">
                    Após configurar, clica "Save" e dá um nome ao perfil.
                </Step>
                <Step number="2" title="Load Profile">
                    Seleciona um perfil guardado e clica "Load" para aplicar.
                </Step>
                <Step number="3" title="Apply at Startup">
                    Ativa "Apply on Startup" para carregar automaticamente ao iniciar Windows.
                </Step>

                <Tip>
                    Cria perfis diferentes: "Daily" para uso normal, "Benchmark" para
                    testes agressivos. Assim podes trocar facilmente.
                </Tip>
            </Section>

            <Section title="Aplicar e Reset">
                <ConfigList items={[
                    { field: 'Apply', value: 'Aplica as alterações atuais' },
                    { field: 'Revert', value: 'Volta ao estado antes do último Apply' },
                    { field: 'Reset to Defaults', value: 'Volta a todos os valores stock' },
                ]} />

                <Warning>
                    As alterações no XTU são perdidas ao reiniciar (exceto se usares
                    "Apply on Startup"). Para settings permanentes, usa a BIOS.
                </Warning>
            </Section>

            <Section title="Próximos Passos">
                <p>
                    Agora que conheces o software:
                </p>
                <ConfigList items={[
                    { field: '→ Guia OC CPU Intel', value: 'Ratios, voltages, metodologia completa' },
                    { field: '→ Guia BIOS Basics', value: 'Como aplicar settings permanentes' },
                ]} />
            </Section>
        </GuideLayout>
    )
}

export default IntelXtu
