// =====================================================
// AMD RYZEN MASTER GUIDE - Software Tutorial
// =====================================================
// Focus: How to use the software, interface explanation
// OC methodology is in the AMD CPU OC guide

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const RyzenMaster = ({ onBack }) => {
    return (
        <GuideLayout
            title="AMD Ryzen Master"
            subtitle="Tutorial completo do software - interface, funcionalidades e modos"
            difficulty="Iniciante"
            readTime="10 min"
            onBack={onBack}
        >
            <Section title="O que é o Ryzen Master?">
                <p>
                    O AMD Ryzen Master é a ferramenta oficial da AMD para monitorização e ajuste
                    de processadores Ryzen. Permite ver informações detalhadas do CPU e fazer
                    ajustes sem reiniciar para a BIOS.
                </p>
                <p>
                    Este guia foca-se em <strong>como usar o software</strong>. Para metodologia
                    de overclock, consulta o <strong>Guia de Overclock CPU AMD</strong>.
                </p>
            </Section>

            <Section title="Download e Instalação">
                <Step number="1" title="Download">
                    Vai ao site da AMD: <Code>amd.com/ryzen-master</Code> e faz download.
                </Step>
                <Step number="2" title="Requisitos">
                    Requer Windows 10/11 64-bit e um processador Ryzen suportado.
                </Step>
                <Step number="3" title="Instalação">
                    Executa o instalador com direitos de administrador. Reinicia após instalar.
                </Step>
            </Section>

            <Section title="Interface Principal">
                <p>
                    O Ryzen Master tem uma interface organizada em secções:
                </p>
                <ConfigList items={[
                    { field: 'Home', value: 'Vista geral com info do CPU e estado atual' },
                    { field: 'Profile Tabs', value: 'Creator Mode, Game Mode, Custom Profiles' },
                    { field: 'Left Panel', value: 'Informações do sistema (RAM, motherboard)' },
                    { field: 'Center', value: 'Controlos de ajuste' },
                    { field: 'Right Panel', value: 'Monitorização em tempo real' },
                ]} />
            </Section>

            <Section title="Modos Disponíveis">
                <ConfigList items={[
                    { field: 'Creator Mode', value: 'Todos os cores ativos, para produtividade' },
                    { field: 'Game Mode', value: 'Metade dos cores (útil em CPUs com 2 CCDs)' },
                    { field: 'Profile 1/2', value: 'Perfis personalizados que guardas' },
                    { field: 'Default', value: 'Valores de fábrica do CPU' },
                ]} />
                <Tip>
                    Para a maioria dos utilizadores, <strong>Creator Mode</strong> é a melhor opção.
                    Game Mode só ajuda em CPUs como o 5900X/5950X em alguns jogos específicos.
                </Tip>
            </Section>

            <Section title="Painel de Informações (Esquerda)">
                <p>
                    Mostra dados do sistema:
                </p>
                <ConfigList items={[
                    { field: 'CPU Model', value: 'Nome e família do processador' },
                    { field: 'Core Count', value: 'Núcleos físicos e threads' },
                    { field: 'Package', value: 'Socket (AM4, AM5, etc.)' },
                    { field: 'RAM Speed', value: 'Velocidade atual da memória' },
                    { field: 'Motherboard', value: 'Fabricante e modelo' },
                    { field: 'BIOS Version', value: 'Versão do firmware' },
                ]} />
            </Section>

            <Section title="Controlos de Ajuste (Centro)">
                <p>
                    Os controlos principais quando selecionas um perfil personalizável:
                </p>
                <ConfigList items={[
                    { field: 'Control Mode', value: 'Auto, PBO, Manual - define o tipo de controlo' },
                    { field: 'Peak Core(s) Voltage', value: 'Voltagem máxima dos cores' },
                    { field: 'PPT (W)', value: 'Package Power Tracking - limite de potência total' },
                    { field: 'TDC (A)', value: 'Thermal Design Current - corrente sustentada' },
                    { field: 'EDC (A)', value: 'Electrical Design Current - corrente de pico' },
                    { field: 'Precision Boost Overdrive', value: 'Ativar/desativar PBO' },
                ]} />

                <p>
                    <strong>O que significa cada valor</strong> está explicado no
                    <strong> Guia de Overclock CPU AMD</strong>.
                </p>
            </Section>

            <Section title="Monitorização (Direita)">
                <p>
                    O painel direito mostra dados em tempo real:
                </p>
                <ConfigList items={[
                    { field: 'Speed (MHz)', value: 'Frequência atual de cada core' },
                    { field: 'Peak Speed', value: 'Clock boost máximo atingido' },
                    { field: 'Temperature', value: 'Temperatura do die (Tdie) e junction (Tjmax)' },
                    { field: 'Voltage', value: 'Voltagem atual do core' },
                    { field: 'PPT/TDC/EDC %', value: 'Quanto dos limites está a ser usado' },
                    { field: 'Fabric Clock', value: 'Frequência do Infinity Fabric' },
                ]} />

                <Tip>
                    A barra de PPT/TDC/EDC em % mostra se estás limitado por potência.
                    Se alguma estiver a 100%, o CPU está a fazer throttling.
                </Tip>
            </Section>

            <Section title="Vista de Cores">
                <p>
                    O Ryzen Master mostra cada core individualmente:
                </p>
                <ConfigList items={[
                    { field: 'Core Grid', value: 'Cores organizados por CCD/CCX' },
                    { field: 'Estrela (★)', value: 'Best core - o mais rápido do chip' },
                    { field: 'Cor', value: 'Verde = ativo, Cinza = parking/sleep' },
                    { field: 'Frequência', value: 'Clock atual de cada core' },
                ]} />

                <p>
                    Esta vista é útil para o <strong>Curve Optimizer per-core</strong> -
                    consulta o <strong>Guia de Overclock CPU AMD</strong>.
                </p>
            </Section>

            <Section title="Como Aplicar Alterações">
                <Step number="1" title="Selecionar Perfil">
                    Clica no perfil que queres modificar (Profile 1 ou 2).
                </Step>
                <Step number="2" title="Fazer Ajustes">
                    Modifica os valores desejados.
                </Step>
                <Step number="3" title="Apply">
                    Clica em "Apply" para ativar as alterações imediatamente.
                </Step>
                <Step number="4" title="Apply & Test">
                    Opcionalmente, usa "Apply & Test" para testar com stress rápido.
                </Step>

                <Warning>
                    As alterações feitas no Ryzen Master <strong>não são permanentes</strong>.
                    Após reiniciar, volta aos defaults. Para ajustes permanentes, usa a BIOS.
                </Warning>
            </Section>

            <Section title="Reset e Segurança">
                <ConfigList items={[
                    { field: 'Reset', value: 'Volta os valores do perfil atual para defaults' },
                    { field: 'Crash?', value: 'Reinicia o PC - tudo volta ao normal' },
                    { field: 'Default Profile', value: 'Sempre tens acesso aos valores stock' },
                ]} />
            </Section>

            <Section title="Limitações">
                <ConfigList items={[
                    { field: 'Curve Optimizer', value: 'Não disponível no Ryzen Master (só BIOS)' },
                    { field: 'FCLK manual', value: 'Limitado - melhor na BIOS' },
                    { field: 'Persistência', value: 'Alterações perdidas ao reiniciar' },
                ]} />

                <Tip>
                    Usa o Ryzen Master para testar valores rapidamente. Depois de encontrares
                    settings estáveis, aplica-os na BIOS para ficarem permanentes.
                </Tip>
            </Section>

            <Section title="Próximos Passos">
                <p>
                    Agora que conheces o software:
                </p>
                <ConfigList items={[
                    { field: '→ Guia OC CPU AMD', value: 'PBO, Curve Optimizer, metodologia completa' },
                    { field: '→ Guia BIOS Basics', value: 'Como aplicar settings permanentes' },
                ]} />
            </Section>
        </GuideLayout>
    )
}

export default RyzenMaster
