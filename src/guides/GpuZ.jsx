// =====================================================
// GPU-Z GUIDE - GPU Information Tool
// =====================================================

import GuideLayout, { Section, Step, Tip, ConfigList } from './GuideLayout'

const GpuZ = ({ onBack }) => {
    return (
        <GuideLayout
            title="GPU-Z"
            subtitle="Informação detalhada sobre a placa gráfica e monitorização"
            difficulty="Iniciante"
            readTime="6 min"
            onBack={onBack}
        >
            <Section title="O que é o GPU-Z?">
                <p>
                    O GPU-Z é a ferramenta definitiva para ver <strong>todas as especificações</strong>
                    da tua placa gráfica. Mostra modelo exato, clocks, temperaturas e muito mais
                    em tempo real.
                </p>
            </Section>

            <Section title="Download">
                <Step number="1" title="Obter">
                    Vai a techpowerup.com/gpuz e faz download.
                </Step>
                <Step number="2" title="Executar">
                    Podes instalar ou executar directamente (standalone).
                </Step>
            </Section>

            <Section title="Aba Graphics Card">
                <p>Informação principal da GPU:</p>
                <ConfigList items={[
                    { field: 'Name', value: 'Nome comercial da placa' },
                    { field: 'GPU', value: 'Chip gráfico (ex: AD102, Navi 31)' },
                    { field: 'Revision', value: 'Revisão do silício' },
                    { field: 'Technology', value: 'Processo de fabrico (ex: 5nm TSMC)' },
                    { field: 'BIOS Version', value: 'Versão do vBIOS' },
                    { field: 'Subvendor', value: 'Fabricante da placa (ASUS, MSI, etc.)' },
                ]} />
            </Section>

            <Section title="Clocks">
                <p>Frequências da GPU:</p>
                <ConfigList items={[
                    { field: 'GPU Clock', value: 'Frequência atual do GPU' },
                    { field: 'Memory', value: 'Frequência da VRAM' },
                    { field: 'Boost', value: 'Clock máximo de boost' },
                    { field: 'Default Clock', value: 'Valores stock de fábrica' },
                ]} />
                <Tip>
                    Compara "Default Clock" com "GPU Clock" para ver se o OC está aplicado.
                </Tip>
            </Section>

            <Section title="Memória">
                <ConfigList items={[
                    { field: 'Memory Size', value: 'Quantidade de VRAM' },
                    { field: 'Memory Type', value: 'GDDR6, GDDR6X, etc.' },
                    { field: 'Bus Width', value: 'Largura do barramento (256-bit, 384-bit...)' },
                    { field: 'Bandwidth', value: 'Largura de banda total' },
                    { field: 'Memory Vendor', value: 'Fabricante dos chips (Samsung, Micron, Hynix)' },
                ]} />
                <Tip>
                    Chips Samsung geralmente fazem melhor overclock de memória que Micron/Hynix.
                </Tip>
            </Section>

            <Section title="Aba Sensors">
                <p>Monitorização em tempo real:</p>
                <ConfigList items={[
                    { field: 'GPU Temperature', value: 'Temperatura atual do chip' },
                    { field: 'Hot Spot', value: 'Ponto mais quente do die' },
                    { field: 'Memory Temperature', value: 'Temp da VRAM (se disponível)' },
                    { field: 'GPU Load', value: 'Utilização percentual' },
                    { field: 'Memory Used', value: 'VRAM em uso' },
                    { field: 'GPU Clock', value: 'Frequência atual em tempo real' },
                    { field: 'Fan Speed', value: 'Velocidade das ventoinhas' },
                    { field: 'Board Power', value: 'Consumo total da placa' },
                    { field: 'GPU Voltage', value: 'Voltagem atual' },
                    { field: 'PerfCap Reason', value: 'Razão para limitação de performance' },
                ]} />
            </Section>

            <Section title="PerfCap Reason">
                <p>Este sensor é importante para OC - mostra porque a GPU está limitada:</p>
                <ConfigList items={[
                    { field: 'Idle', value: 'GPU em repouso' },
                    { field: 'Pwr', value: 'Atingiu limite de potência - aumenta Power Limit' },
                    { field: 'Thrm', value: 'Limite térmico - arrefecimento insuficiente' },
                    { field: 'VRel', value: 'Limite de voltagem reliability' },
                    { field: 'VOp', value: 'Limite operacional de voltagem' },
                ]} />
            </Section>

            <Section title="Funcionalidades Úteis">
                <Step number="1" title="Screenshot">
                    Clica no ícone de câmara para guardar specs como imagem.
                </Step>
                <Step number="2" title="Log">
                    Em Sensors, clica "Log to file" para gravar dados.
                </Step>
                <Step number="3" title="Validação">
                    Clica "Lookup" para ver specs no site TechPowerUp.
                </Step>
            </Section>

            <Section title="Detetar GPU Falsa">
                <p>
                    O GPU-Z consegue detetar GPUs falsas (remarcadas):
                </p>
                <ConfigList items={[
                    { field: '[FAKE]', value: 'Aparece se a BIOS não corresponde ao hardware real' },
                    { field: 'Shaders/TMUs', value: 'Valores errados indicam GPU remarcada' },
                ]} />
                <Tip>
                    Sempre verifica com GPU-Z ao comprar uma placa usada!
                </Tip>
            </Section>
        </GuideLayout>
    )
}

export default GpuZ
