// =====================================================
// CPU-Z GUIDE - CPU Information Tool
// =====================================================

import GuideLayout, { Section, Step, Tip, ConfigList } from './GuideLayout'

const CpuZ = ({ onBack }) => {
    return (
        <GuideLayout
            title="CPU-Z"
            subtitle="Informação detalhada sobre CPU, RAM e motherboard"
            difficulty="Iniciante"
            readTime="6 min"
            onBack={onBack}
        >
            <Section title="O que é o CPU-Z?">
                <p>
                    O CPU-Z é uma ferramenta gratuita que mostra <strong>informação detalhada</strong>
                    sobre o processador, memória RAM e motherboard. É essencial para verificar
                    se o overclock está aplicado corretamente.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a cpuid.com/softwares/cpu-z.html e faz download da versão "Classic".
                </Step>
                <Step number="2" title="Executar">
                    Disponível como installer ou versão portable (ZIP).
                </Step>
            </Section>

            <Section title="Aba CPU">
                <p>Informação principal do processador:</p>
                <ConfigList items={[
                    { field: 'Name', value: 'Nome comercial do CPU' },
                    { field: 'Code Name', value: 'Nome da arquitetura (ex: Raptor Lake, Zen 4)' },
                    { field: 'Package', value: 'Socket utilizado' },
                    { field: 'Core Speed', value: 'Frequência ATUAL do CPU - verifica OC aqui!' },
                    { field: 'Multiplier', value: 'Multiplicador atual × Bus Speed = Core Speed' },
                    { field: 'Bus Speed', value: 'Frequência base (geralmente 100 MHz)' },
                    { field: 'Cores/Threads', value: 'Número de núcleos físicos e threads' },
                ]} />
                <Tip>
                    O <strong>Core Speed</strong> muda em tempo real. Põe carga no CPU
                    para ver a frequência máxima atingida.
                </Tip>
            </Section>

            <Section title="Aba Caches">
                <p>Mostra a hierarquia de cache do CPU:</p>
                <ConfigList items={[
                    { field: 'L1 Data/Inst', value: 'Cache de primeiro nível (mais rápida, menor)' },
                    { field: 'L2 Cache', value: 'Cache de segundo nível' },
                    { field: 'L3 Cache', value: 'Cache partilhada entre cores' },
                ]} />
            </Section>

            <Section title="Aba Mainboard">
                <p>Informação sobre a motherboard:</p>
                <ConfigList items={[
                    { field: 'Manufacturer', value: 'Fabricante (ASUS, MSI, Gigabyte...)' },
                    { field: 'Model', value: 'Modelo exato da placa' },
                    { field: 'Chipset', value: 'Chipset utilizado (B650, Z790...)' },
                    { field: 'BIOS Version', value: 'Versão atual do BIOS - importante para updates' },
                ]} />
            </Section>

            <Section title="Aba Memory">
                <p>Informação geral da RAM:</p>
                <ConfigList items={[
                    { field: 'Type', value: 'DDR4 ou DDR5' },
                    { field: 'Size', value: 'Capacidade total instalada' },
                    { field: 'Channel #', value: 'Single, Dual ou Quad Channel' },
                    { field: 'DRAM Frequency', value: 'Frequência REAL da RAM (metade do valor DDR)' },
                ]} />
                <Tip>
                    A frequência mostrada é a real. Para DDR, multiplica por 2.
                    Ex: 1600 MHz mostrado = DDR4-3200.
                </Tip>
            </Section>

            <Section title="Aba SPD">
                <p>Informação de cada módulo de RAM individualmente:</p>
                <ConfigList items={[
                    { field: 'Slot #', value: 'Seleciona qual slot ver' },
                    { field: 'Module Size', value: 'Capacidade deste módulo' },
                    { field: 'Manufacturer', value: 'Fabricante dos chips de memória' },
                    { field: 'XMP/EXPO', value: 'Perfis de overclock disponíveis' },
                    { field: 'Timings Table', value: 'Timings para cada velocidade suportada' },
                ]} />
            </Section>

            <Section title="Bench">
                <p>CPU-Z inclui um benchmark simples para comparações rápidas:</p>
                <Step number="1" title="Aceder">
                    Clica na aba "Bench".
                </Step>
                <Step number="2" title="Executar">
                    Clica "Bench CPU" para single-thread e multi-thread.
                </Step>
                <Step number="3" title="Comparar">
                    Usa "Reference" para comparar com outros CPUs.
                </Step>
            </Section>

            <Section title="Validação Online">
                <p>
                    Podes validar e partilhar o teu sistema:
                </p>
                <Step number="1" title="Validar">
                    Clica em "Validate" na barra de ferramentas.
                </Step>
                <Step number="2" title="Submeter">
                    Cria uma conta ou submete como anónimo.
                </Step>
                <Step number="3" title="Partilhar">
                    Recebe um link para partilhar specs do teu sistema.
                </Step>
            </Section>
        </GuideLayout>
    )
}

export default CpuZ
