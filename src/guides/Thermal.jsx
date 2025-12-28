// =====================================================
// THERMAL MANAGEMENT GUIDE - Cooling & Temperatures
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const Thermal = ({ onBack }) => {
    return (
        <GuideLayout
            title="Gestão Térmica"
            subtitle="Arrefecimento, pasta térmica, airflow e como manter o hardware fresco"
            difficulty="Iniciante"
            readTime="12 min"
            onBack={onBack}
        >
            <Section title="Porque é a Temperatura Importante?">
                <p>
                    Temperatura é o <strong>principal limitador de performance</strong> em overclock.
                    Hardware muito quente faz throttling (reduz velocidade) ou pode até danificar-se.
                </p>
                <p>
                    Bom arrefecimento permite overclocks mais altos e hardware que dura mais anos.
                </p>
            </Section>

            <Section title="Temperaturas Ideais">
                <p><strong>Em carga (gaming/stress test):</strong></p>
                <ConfigList items={[
                    { field: 'CPU (ideal)', value: '70-80°C' },
                    { field: 'CPU (máximo)', value: '85-90°C' },
                    { field: 'GPU (ideal)', value: '65-75°C' },
                    { field: 'GPU (máximo)', value: '83-85°C' },
                    { field: 'GPU Hot Spot', value: 'Até 95°C é normal' },
                    { field: 'VRAM (GDDR6X)', value: '90-100°C é comum' },
                ]} />
                <p><strong>Em idle (desktop):</strong></p>
                <ConfigList items={[
                    { field: 'CPU', value: '30-45°C' },
                    { field: 'GPU', value: '30-50°C (fans podem parar)' },
                ]} />
            </Section>

            <Section title="Tipos de Arrefecimento CPU">
                <ConfigList items={[
                    { field: 'Stock Cooler', value: 'Suficiente para stock, limitado para OC' },
                    { field: 'Tower Air Cooler', value: 'Noctua, be quiet!, etc - excelente custo-benefício' },
                    { field: 'AIO Liquid 240mm', value: 'Bom para OC moderado' },
                    { field: 'AIO Liquid 360mm', value: 'Ideal para OC agressivo' },
                    { field: 'Custom Loop', value: 'Melhor performance, mais caro e complexo' },
                ]} />
                <Tip>
                    Um bom tower cooler (€50-80) é suficiente para a maioria dos overclocks.
                    AIO só compensa para CPUs de muito alto consumo.
                </Tip>
            </Section>

            <Section title="Pasta Térmica">
                <p>
                    A pasta térmica preenche micro-imperfeições entre o CPU/GPU e o cooler.
                </p>
                <ConfigList items={[
                    { field: 'Quando trocar', value: 'A cada 2-5 anos, ou se temps subirem' },
                    { field: 'Boas marcas', value: 'Thermal Grizzly Kryonaut, Noctua NT-H1, Arctic MX-4' },
                    { field: 'Quantidade', value: 'Tamanho de um grão de arroz a ervilha' },
                    { field: 'Método', value: 'Ponto central ou X fino para CPUs grandes' },
                ]} />
            </Section>

            <Section title="Aplicar Pasta Térmica">
                <Step number="1" title="Limpar">
                    Remove pasta antiga com álcool isopropílico (90%+) e um pano sem fibras.
                </Step>
                <Step number="2" title="Aplicar">
                    Coloca uma pequena quantidade no centro do CPU/GPU.
                </Step>
                <Step number="3" title="Montar">
                    Coloca o cooler e aperta parafusos em padrão diagonal (não aperta tudo de um lado).
                </Step>
                <Step number="4" title="Verificar">
                    Após montar, verifica temperatures. Se muito altas, desmonta e verifica aplicação.
                </Step>
            </Section>

            <Section title="Airflow da Caixa">
                <p>
                    Airflow é tão importante quanto o cooler do CPU:
                </p>
                <ConfigList items={[
                    { field: 'Intake (entrada)', value: 'Frente e/ou baixo da caixa - ar fresco entra' },
                    { field: 'Exhaust (saída)', value: 'Trás e topo - ar quente sai' },
                    { field: 'Pressão positiva', value: 'Mais intake que exhaust - menos pó, recomendado' },
                    { field: 'Pressão negativa', value: 'Mais exhaust - acumula pó' },
                ]} />
                <Step number="1" title="Config Básica">
                    2-3 fans frontais (intake) + 1 traseira + 1-2 topo (exhaust).
                </Step>
            </Section>

            <Section title="Curva de Ventoinha">
                <p>
                    Configurar curvas de fans equilibra ruído e arrefecimento:
                </p>
                <ConfigList items={[
                    { field: 'Até 50°C', value: '30-40% - silencioso em idle' },
                    { field: '50-65°C', value: '40-60% - uso leve' },
                    { field: '65-75°C', value: '60-80% - gaming' },
                    { field: '75-85°C', value: '80-100% - stress/OC' },
                ]} />
                <Tip>
                    Configura no BIOS ou software como MSI Afterburner (GPU) e
                    Fan Control (caixa/CPU).
                </Tip>
            </Section>

            <Section title="GPU - Thermal Pads e Repaste">
                <p>
                    GPUs também beneficiam de manutenção térmica:
                </p>
                <ConfigList items={[
                    { field: 'Pasta no die', value: 'Trocar melhora temps do GPU em 5-10°C' },
                    { field: 'Thermal pads na VRAM', value: 'Importante para RTX 30/40, RX 6000/7000' },
                    { field: 'Backplate pads', value: 'Ajuda a dissipar calor pela traseira' },
                ]} />
                <Warning>
                    Desmontar a GPU anula garantia. Só recomendado após garantia expirar.
                </Warning>
            </Section>

            <Section title="Sintomas de Problemas Térmicos">
                <ConfigList items={[
                    { field: 'Throttling', value: 'Performance inconsistente, clocks a baixar' },
                    { field: 'Shutdowns', value: 'PC desliga sozinho sob carga' },
                    { field: 'Fans muito altas', value: 'Constantemente a 100%' },
                    { field: 'Temps idle altas', value: '50°C+ em desktop pode indicar problema' },
                ]} />
            </Section>
        </GuideLayout>
    )
}

export default Thermal
