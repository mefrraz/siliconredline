// =====================================================
// HWiNFO64 GUIDE - System Monitoring Tutorial
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const HwInfo = ({ onBack }) => {
    return (
        <GuideLayout
            title="HWiNFO64"
            subtitle="Monitorização completa de temperaturas, voltagens e sensores do sistema"
            difficulty="Iniciante"
            readTime="10 min"
            onBack={onBack}
        >
            <Section title="O que é o HWiNFO64?">
                <p>
                    O HWiNFO64 é a ferramenta de monitorização mais completa e precisa para PC.
                    Mostra <strong>todos os sensores</strong> do sistema em tempo real: temperaturas,
                    voltagens, frequências, consumo de energia e muito mais.
                </p>
                <p>
                    É essencial para overclock pois permite verificar se os valores estão dentro
                    de limites seguros durante stress tests.
                </p>
            </Section>

            <Section title="Download e Instalação">
                <Step number="1" title="Download">
                    Vai ao site oficial: hwinfo.com/download e escolhe a versão "Portable" ou "Installer".
                </Step>
                <Step number="2" title="Primeiro Arranque">
                    Ao abrir, escolhe <strong>"Sensors-only"</strong> para ir diretamente para a
                    janela de monitorização.
                </Step>
            </Section>

            <Section title="Janela de Sensores">
                <p>A janela principal mostra todos os sensores organizados por componente:</p>
                <ConfigList items={[
                    { field: 'CPU [#0]', value: 'Temperaturas, frequências e voltagens do processador' },
                    { field: 'GPU [#0]', value: 'Dados da placa gráfica' },
                    { field: 'Memory', value: 'Uso e timings da RAM' },
                    { field: 'S.M.A.R.T.', value: 'Saúde dos discos' },
                    { field: 'System', value: 'Temperaturas da motherboard e ventoínhas' },
                ]} />
            </Section>

            <Section title="Sensores Importantes para OC">
                <p><strong>CPU:</strong></p>
                <ConfigList items={[
                    { field: 'CPU Package', value: 'Temperatura geral do CPU - manter abaixo de 85°C' },
                    { field: 'Core Max', value: 'Temperatura do core mais quente' },
                    { field: 'CPU Package Power', value: 'Consumo total do CPU em Watts' },
                    { field: 'Vcore', value: 'Voltagem do CPU - verificar se está no valor definido' },
                    { field: 'Clock', value: 'Frequência atual de cada core' },
                ]} />

                <p><strong>GPU:</strong></p>
                <ConfigList items={[
                    { field: 'GPU Temperature', value: 'Temp do chip - manter abaixo de 80°C' },
                    { field: 'GPU Hot Spot', value: 'Ponto mais quente - pode ser 10-15°C acima' },
                    { field: 'GPU Memory Junction', value: 'Temp da VRAM (importante em GPUs modernas)' },
                    { field: 'GPU Clock', value: 'Frequência atual do GPU' },
                    { field: 'GPU Power', value: 'Consumo da placa gráfica' },
                ]} />
            </Section>

            <Section title="Colunas de Dados">
                <p>Cada sensor mostra várias colunas:</p>
                <ConfigList items={[
                    { field: 'Current', value: 'Valor atual em tempo real' },
                    { field: 'Minimum', value: 'Valor mais baixo desde que abriu' },
                    { field: 'Maximum', value: 'Valor mais alto - importante para stress tests!' },
                    { field: 'Average', value: 'Média dos valores registados' },
                ]} />
                <Tip>
                    O valor <strong>Maximum</strong> é o mais importante durante stress tests.
                    É o pico que o hardware atingiu.
                </Tip>
            </Section>

            <Section title="Reset de Estatísticas">
                <Step number="1" title="Resetar Valores">
                    Clica com o botão direito em qualquer sensor e escolhe <strong>"Reset Min/Max/Avg"</strong>
                    para limpar os valores antes de um teste.
                </Step>
                <Step number="2" title="Atalho">
                    Usa o ícone de relógio na toolbar para resetar todas as estatísticas de uma vez.
                </Step>
            </Section>

            <Section title="Logging (Registo)">
                <p>
                    O HWiNFO pode gravar todos os dados para análise posterior:
                </p>
                <Step number="1" title="Iniciar Log">
                    Clica no ícone de disquete verde ou vai a Tools → Sensor Logging.
                </Step>
                <Step number="2" title="Configurar">
                    Escolhe o intervalo (1000ms = 1x por segundo) e o ficheiro de destino (.CSV).
                </Step>
                <Step number="3" title="Analisar">
                    Abre o CSV no Excel para ver gráficos e identificar picos problemáticos.
                </Step>
                <Tip>
                    Faz um log de 15-30 minutos durante gaming para ver o comportamento real do hardware.
                </Tip>
            </Section>

            <Section title="Configurações Úteis">
                <p>Vai a Settings (ícone de engrenagem) para personalizar:</p>
                <ConfigList items={[
                    { field: 'General → Minimize on Close', value: 'Mantém na system tray' },
                    { field: 'General → Start Minimized', value: 'Inicia minimizado' },
                    { field: 'Safety → Disable disk activity', value: 'Reduz uso do disco' },
                    { field: 'Sensors → Polling Period', value: '500-2000ms (mais baixo = mais updates)' },
                ]} />
            </Section>

            <Section title="Integração com Afterburner">
                <p>
                    O HWiNFO pode enviar dados para o overlay do MSI Afterburner:
                </p>
                <Step number="1" title="Ativar">
                    Em Settings → Sensors → HWiNFO Shared Memory Support, marca a opção.
                </Step>
                <Step number="2" title="No Afterburner">
                    Em Monitoring, os sensores do HWiNFO aparecem e podem ser adicionados ao OSD.
                </Step>
            </Section>

            <Warning>
                Mantém o HWiNFO aberto durante qualquer overclock ou stress test.
                É a tua janela para ver se algo está errado antes de causar danos.
            </Warning>
        </GuideLayout>
    )
}

export default HwInfo
