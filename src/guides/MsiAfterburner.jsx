// =====================================================
// MSI AFTERBURNER GUIDE - Software Tutorial
// =====================================================
// Focus: How to use the software, interface explanation
// OC methodology is in the GPU OC guide

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const MsiAfterburner = ({ onBack }) => {
    return (
        <GuideLayout
            title="MSI Afterburner"
            subtitle="Tutorial completo do software - interface, funcionalidades e configuração"
            difficulty="Iniciante"
            readTime="12 min"
            onBack={onBack}
        >
            <Section title="O que é o MSI Afterburner?">
                <p>
                    O MSI Afterburner é o software mais popular para controlo e overclock de placas gráficas.
                    Apesar do nome, funciona com <strong>qualquer GPU</strong> - NVIDIA ou AMD, de qualquer fabricante.
                </p>
                <p>
                    Este guia foca-se em explicar <strong>como usar o software</strong>. Para metodologia
                    de overclock, consulta o <strong>Guia de Overclock de GPU</strong>.
                </p>
            </Section>

            <Section title="Download e Instalação">
                <Step number="1" title="Download">
                    Vai ao site oficial da MSI: <Code>msi.com/Landing/afterburner</Code> e faz download
                    da versão mais recente.
                </Step>
                <Step number="2" title="Instalação">
                    Executa o instalador. Durante a instalação, <strong>mantém RivaTuner Statistics Server
                        (RTSS) selecionado</strong> - é essencial para o overlay de monitorização.
                </Step>
                <Step number="3" title="Primeiro Arranque">
                    Ao abrir, podes escolher um skin. Recomendo o skin "Default MSI Afterburner v3"
                    ou "MSI Cyborg" para melhor visibilidade.
                </Step>
            </Section>

            <Section title="Interface Principal - Painel Central">
                <p>
                    O painel central mostra os controlos principais em forma de sliders:
                </p>
                <ConfigList items={[
                    { field: 'Core Voltage (mV)', value: 'Voltagem do núcleo GPU (pode estar bloqueado)' },
                    { field: 'Power Limit (%)', value: 'Limite de potência máxima' },
                    { field: 'Temp Limit (°C)', value: 'Limite de temperatura antes de throttling' },
                    { field: 'Core Clock (MHz)', value: 'Offset do clock do núcleo' },
                    { field: 'Memory Clock (MHz)', value: 'Offset do clock da memória VRAM' },
                    { field: 'Fan Speed (%)', value: 'Velocidade da ventoinha (se manual)' },
                ]} />
            </Section>

            <Section title="Painel Esquerdo - Informações">
                <ConfigList items={[
                    { field: 'GPU Temp', value: 'Temperatura atual da GPU' },
                    { field: 'Nome GPU', value: 'Modelo da placa gráfica detetada' },
                    { field: 'Driver Version', value: 'Versão do driver instalado' },
                ]} />
            </Section>

            <Section title="Painel Direito - Estado Atual">
                <ConfigList items={[
                    { field: 'Voltage', value: 'Voltagem atual em tempo real' },
                    { field: 'Clock', value: 'Frequência atual do GPU' },
                    { field: 'Mem', value: 'Frequência atual da memória' },
                ]} />
            </Section>

            <Section title="Botões de Controlo">
                <ConfigList items={[
                    { field: '✓ (Apply)', value: 'Aplica as alterações dos sliders' },
                    { field: '↺ (Reset)', value: 'Volta aos valores stock' },
                    { field: '💾 (Save)', value: 'Guarda o perfil atual' },
                    { field: '1-5 (Profiles)', value: 'Slots para guardar/carregar perfis' },
                    { field: '⚙️ (Settings)', value: 'Abre as configurações do programa' },
                    { field: 'Fan Icon', value: 'Abre o editor de curva de ventoinha' },
                    { field: 'Monitor Icon', value: 'Abre o gráfico de monitorização detalhado' },
                ]} />
            </Section>

            <Section title="Definições Importantes (Settings)">
                <p>
                    Clica no ícone ⚙️ para aceder às definições:
                </p>

                <p><strong>Aba General:</strong></p>
                <ConfigList items={[
                    { field: 'Start with Windows', value: 'Inicia o programa automaticamente' },
                    { field: 'Start minimized', value: 'Inicia minimizado na system tray' },
                    { field: 'Apply overclocking at startup', value: 'Aplica o perfil automaticamente ao iniciar' },
                    { field: 'Unlock voltage control', value: 'Desbloqueia controlo de voltagem (se suportado)' },
                    { field: 'Unlock voltage monitoring', value: 'Mostra voltagem no gráfico' },
                ]} />

                <p><strong>Aba Fan:</strong></p>
                <ConfigList items={[
                    { field: 'Enable user defined fan control', value: 'Ativa curva de ventoinha personalizada' },
                    { field: 'Fan curve', value: 'Define velocidade por temperatura' },
                ]} />

                <p><strong>Aba Monitoring:</strong></p>
                <ConfigList items={[
                    { field: 'Active hardware graphs', value: 'Escolhe que dados monitorizar' },
                    { field: 'Show in On-Screen Display', value: 'Mostra no overlay em jogos (requer RTSS)' },
                    { field: 'Hardware polling period', value: 'Frequência de atualização (1000ms = 1x/sec)' },
                ]} />
            </Section>

            <Section title="Curva de Ventoinha (Fan Curve)">
                <p>
                    A curva de ventoinha permite definir a velocidade das fans automaticamente
                    baseado na temperatura:
                </p>
                <Step number="1" title="Aceder">
                    Clica no ícone da ventoinha (ao lado do slider de Fan Speed) ou vai a
                    Settings → Fan.
                </Step>
                <Step number="2" title="Ativar">
                    Marca "Enable user defined software automatic fan control".
                </Step>
                <Step number="3" title="Configurar Pontos">
                    Clica na linha para adicionar pontos. Arrasta-os para definir a velocidade
                    para cada temperatura.
                </Step>

                <p><strong>Exemplo de curva equilibrada:</strong></p>
                <ConfigList items={[
                    { field: '40°C', value: '30% - Silencioso em idle' },
                    { field: '50°C', value: '40%' },
                    { field: '60°C', value: '55%' },
                    { field: '70°C', value: '75%' },
                    { field: '80°C', value: '100% - Máximo' },
                ]} />

                <Tip>
                    Ativa "Apply at Windows startup" para que a curva seja sempre usada.
                </Tip>
            </Section>

            <Section title="On-Screen Display (OSD)">
                <p>
                    O overlay mostra informações em tempo real durante jogos. Requer RTSS instalado.
                </p>
                <Step number="1" title="Configurar Métricas">
                    Em Settings → Monitoring, seleciona cada métrica que queres ver (GPU temp,
                    usage, framerate, etc.) e marca "Show in On-Screen Display".
                </Step>
                <Step number="2" title="Personalizar Aparência">
                    Abre RivaTuner Statistics Server (ícone na system tray) para personalizar
                    posição, tamanho & cor do overlay.
                </Step>
                <Step number="3" title="Atalho">
                    Podes definir um atalho de teclado para mostrar/esconder o OSD em Settings →
                    On-Screen Display.
                </Step>
            </Section>

            <Section title="Perfis">
                <p>
                    O Afterburner permite guardar até 5 perfis diferentes:
                </p>
                <Step number="1" title="Guardar">
                    Configura os sliders como queres, clica no ícone 💾, depois clica num slot (1-5).
                </Step>
                <Step number="2" title="Carregar">
                    Clica no número do slot para carregar esse perfil.
                </Step>
                <Step number="3" title="Atalhos">
                    Em Settings → Profiles, podes definir atalhos de teclado para trocar
                    rapidamente entre perfis.
                </Step>

                <Tip>
                    Cria um perfil "Silent" com fan curve suave para uso leve, e outro
                    "Performance" para gaming pesado.
                </Tip>
            </Section>

            <Section title="Voltage/Frequency Curve (Ctrl+F)">
                <p>
                    Pressionando <Code>Ctrl+F</Code> abres o editor de curva V/F, que permite
                    controlo avançado:
                </p>
                <ConfigList items={[
                    { field: 'Eixo X', value: 'Voltagem (mV)' },
                    { field: 'Eixo Y', value: 'Frequência (MHz)' },
                    { field: 'Pontos', value: 'Cada ponto define freq para uma voltagem' },
                    { field: 'Uso', value: 'Undervolting ou OC preciso' },
                ]} />

                <p>
                    Este é um recurso avançado explicado em detalhe no <strong>Guia de Overclock de GPU</strong>.
                </p>
            </Section>

            <Section title="Próximos Passos">
                <p>
                    Agora que conheces o software, está na hora de fazer overclock:
                </p>
                <ConfigList items={[
                    { field: '→ Guia OC de GPU', value: 'Metodologia completa de overclock step-by-step' },
                    { field: '→ Guia HWiNFO', value: 'Monitorização avançada (quando disponível)' },
                ]} />
            </Section>

            <Warning>
                Lembra-te: o Afterburner só aplica alterações ao clicar ✓ (Apply).
                Se algo correr mal, reiniciar o PC volta tudo ao stock.
            </Warning>
        </GuideLayout>
    )
}

export default MsiAfterburner
