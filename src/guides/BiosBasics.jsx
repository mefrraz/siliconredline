// =====================================================
// BIOS BASICS GUIDE - Complete Edition
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const BiosBasics = ({ onBack }) => {
    return (
        <GuideLayout
            title="BIOS Basics"
            subtitle="Configurações essenciais de BIOS para overclock - o que cada opção faz"
            difficulty="Iniciante"
            readTime="12 min"
            onBack={onBack}
        >
            <Section title="O que é a BIOS?">
                <p>
                    A BIOS (Basic Input/Output System) ou UEFI é o firmware que controla o hardware
                    antes do sistema operativo arrancar. É onde configuras overclock persistente,
                    memória RAM, e funções avançadas da motherboard.
                </p>
                <p>
                    Alterações na BIOS persistem entre reinícios, ao contrário de software como
                    Ryzen Master ou Intel XTU.
                </p>
            </Section>

            <Section title="Como Aceder à BIOS">
                <p>
                    Durante o arranque do computador, antes do logo do Windows, pressiona a tecla:
                </p>
                <ConfigList items={[
                    { field: 'ASUS', value: 'DEL ou F2' },
                    { field: 'MSI', value: 'DEL' },
                    { field: 'Gigabyte', value: 'DEL' },
                    { field: 'ASRock', value: 'F2 ou DEL' },
                    { field: 'EVGA', value: 'DEL' },
                    { field: 'Laptops HP', value: 'F10 ou ESC' },
                    { field: 'Laptops Dell', value: 'F2 ou F12' },
                    { field: 'Laptops Lenovo', value: 'F2 ou Fn+F2' },
                ]} />
                <Tip>
                    Preme a tecla repetidamente assim que ligas o PC. Se entrares no Windows,
                    reinicia e tenta de novo. Dica: desativa "Fast Boot" para teres mais tempo.
                </Tip>
            </Section>

            <Section title="Navegação na BIOS">
                <ConfigList items={[
                    { field: 'Setas', value: 'Navegar entre opções' },
                    { field: 'Enter', value: 'Selecionar/confirmar' },
                    { field: 'ESC', value: 'Voltar/cancelar' },
                    { field: '+/-', value: 'Aumentar/diminuir valores' },
                    { field: 'F10', value: 'Guardar e sair' },
                    { field: 'F5/F6', value: 'Carregar defaults (varia)' },
                ]} />
            </Section>

            <Section title="XMP / EXPO / DOCP - Memória RAM">
                <p>
                    <strong>O que é:</strong> Perfis que ativam a velocidade rated da RAM. Sem isto,
                    a RAM funciona a velocidades mais baixas (ex: DDR5 a 4800MHz em vez de 6000MHz).
                </p>
                <ConfigList items={[
                    { field: 'XMP (Intel)', value: 'Extreme Memory Profile - perfis para RAM' },
                    { field: 'EXPO (AMD)', value: 'Extended Profiles for Overclocking' },
                    { field: 'DOCP (ASUS AMD)', value: 'D.O.C.P. - nome da ASUS para EXPO' },
                    { field: 'Profile 1', value: 'Velocidade rated (ex: 6000MHz CL30)' },
                    { field: 'Profile 2', value: 'Velocidade alternativa (se existir)' },
                ]} />

                <Step number="1" title="Ativar XMP/EXPO">
                    Localiza a opção "XMP", "EXPO" ou "DOCP" no menu de memória ou overclock.
                    Seleciona "Profile 1" ou "Enabled".
                </Step>
                <Step number="2" title="Verificar">
                    Após reiniciar, abre CPU-Z ou Task Manager para confirmar que a RAM está
                    à velocidade correta.
                </Step>

                <Warning>
                    Se o sistema não arrancar após ativar XMP/EXPO, a RAM pode ser incompatível
                    com essa velocidade na tua placa. Verifica a lista QVL no site da motherboard.
                </Warning>
            </Section>

            <Section title="Modos de Voltagem do CPU">
                <p>
                    <strong>VCore</strong> é a voltagem principal do processador. Existem vários modos:
                </p>
                <ConfigList items={[
                    { field: 'Auto', value: 'Motherboard decide automaticamente' },
                    { field: 'Manual/Override', value: 'Valor fixo que defines (perigoso para idle)' },
                    { field: 'Adaptive (Intel)', value: 'Valor base + boost dinâmico' },
                    { field: 'Offset Mode', value: 'Adiciona/subtrai mV do valor Auto' },
                    { field: 'DVID (AMD)', value: 'Dynamic VID - offset sobre stock' },
                ]} />

                <p><strong>Qual usar?</strong></p>
                <ConfigList items={[
                    { field: 'Stock', value: 'Deixa em Auto' },
                    { field: 'OC leve', value: 'Offset mode (ex: +50mV)' },
                    { field: 'OC moderado', value: 'Adaptive com offset' },
                    { field: 'OC extremo', value: 'Manual (só para benchmarks)' },
                ]} />

                <Warning title="Atenção">
                    Modo Manual/Override mantém voltagem alta mesmo em idle, gerando mais calor
                    e consumo. Só usa para testes curtos.
                </Warning>
            </Section>

            <Section title="Load Line Calibration (LLC)">
                <p>
                    <strong>O que é:</strong> Compensa a queda de voltagem quando o CPU está sob carga.
                    Sem LLC, a voltagem "cai" (Vdroop) quando o CPU trabalha pesado.
                </p>
                <ConfigList items={[
                    { field: 'Off/Level 1', value: 'Máximo Vdroop, voltagem cai muito sob carga' },
                    { field: 'Level 3-4', value: 'Equilíbrio - bom para começar' },
                    { field: 'Level 6-7', value: 'Pouco Vdroop - voltagem estável' },
                    { field: 'Turbo/Extreme', value: 'Quase sem Vdroop (cuidado com overshoot)' },
                ]} />

                <Tip>
                    Começa com LLC médio (Level 3-4). Se tiveres instabilidade a clocks altos mesmo
                    com voltagem adequada, aumenta o LLC. Se as temperaturas forem problema, diminui.
                </Tip>
            </Section>

            <Section title="Power Limits - CPU">
                <p>
                    Limites que controlam quanto poder o CPU pode consumir:
                </p>
                <ConfigList items={[
                    { field: 'PL1 (Intel) / PPT (AMD)', value: 'Limite sustentado (Watts)' },
                    { field: 'PL2 (Intel)', value: 'Limite em burst (Watts)' },
                    { field: 'TDC (AMD)', value: 'Limite de corrente sustentada (Amps)' },
                    { field: 'EDC (AMD)', value: 'Limite de corrente pico (Amps)' },
                    { field: 'IccMax (Intel)', value: 'Corrente máxima aos VRMs' },
                ]} />

                <Step number="1" title="Para OC">
                    Remove ou aumenta estes limites para permitir que o CPU atinja os clocks
                    que configuraste. Sem isto, ele pode fazer throttling.
                </Step>
            </Section>

            <Section title="Resizable BAR / SAM">
                <p>
                    <strong>O que é:</strong> Permite que o CPU aceda a toda a memória da GPU
                    de uma vez, em vez de em blocos de 256MB. Melhora performance em alguns jogos.
                </p>
                <ConfigList items={[
                    { field: 'Resizable BAR', value: 'Nome Intel' },
                    { field: 'Smart Access Memory', value: 'Nome AMD (SAM)' },
                    { field: 'Above 4G Decoding', value: 'Também precisa estar ativado' },
                    { field: 'Ganho típico', value: '0-10% FPS dependendo do jogo' },
                ]} />

                <Step number="1">Ativa "Above 4G Decoding" primeiro.</Step>
                <Step number="2">Ativa "Resizable BAR" ou "Re-Size BAR Support".</Step>
                <Step number="3">Reinicia e verifica no GPU-Z se está ativo.</Step>
            </Section>

            <Section title="Outras Opções Importantes">
                <ConfigList items={[
                    { field: 'Fast Boot', value: 'Desativar para acesso mais fácil à BIOS' },
                    { field: 'Secure Boot', value: 'Necessário para Windows 11' },
                    { field: 'TPM 2.0', value: 'Necessário para Windows 11' },
                    { field: 'AHCI Mode', value: 'Para SSDs SATA (não NVMe)' },
                    { field: 'CSM (Legacy)', value: 'Desativar para GPUs modernas' },
                ]} />
            </Section>

            <Section title="Clear CMOS - Reset de BIOS">
                <p>
                    Se algo correr mal e o PC não arrancar, podes fazer reset às configurações:
                </p>
                <Step number="1">Desliga completamente o PC e a fonte de alimentação (switch atrás).</Step>
                <Step number="2">
                    <strong>Opção A:</strong> Remove a pilha CR2032 da motherboard por 30-60 segundos.
                </Step>
                <Step number="3">
                    <strong>Opção B:</strong> Usa o jumper "CLRCMOS" na motherboard (consulta o manual).
                </Step>
                <Step number="4">
                    <strong>Opção C:</strong> Algumas motherboards têm botão "Clear CMOS" no painel traseiro.
                </Step>
                <Step number="5">Volta a ligar e a BIOS estará nos defaults de fábrica.</Step>

                <Warning>
                    Após Clear CMOS, todas as configurações voltam ao stock, incluindo ordem de boot.
                    Precisarás reconfigurar tudo.
                </Warning>
            </Section>

            <Tip title="Dica Pro">
                A maioria das BIOS modernas permite guardar perfis. Após configurar tudo, guarda
                um perfil ("User Profile" ou similar) para poderes restaurar rapidamente se algo
                correr mal.
            </Tip>
        </GuideLayout>
    )
}

export default BiosBasics
