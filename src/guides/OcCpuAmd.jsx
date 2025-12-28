// =====================================================
// AMD CPU OVERCLOCK GUIDE - Complete
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const OcCpuAmd = ({ onBack }) => {
    return (
        <GuideLayout
            title="Overclock CPU AMD"
            subtitle="Guia completo de OC para Ryzen - PBO, Curve Optimizer e overclock manual"
            difficulty="Avançado"
            readTime="25 min"
            onBack={onBack}
        >
            <Section title="Filosofia de OC AMD Ryzen">
                <p>
                    Os processadores Ryzen modernos (3000, 5000, 7000) são muito diferentes dos Intel
                    quando se trata de overclock. O algoritmo de boost da AMD é altamente otimizado,
                    por isso <strong>PBO + Curve Optimizer</strong> geralmente supera OC manual.
                </p>
                <ConfigList items={[
                    { field: 'PBO', value: 'Recommended para 99% dos utilizadores' },
                    { field: 'OC Manual', value: 'Só para workloads 100% multi-core constante' },
                    { field: 'Razão', value: 'Manual perde boost single-core dinâmico' },
                ]} />
            </Section>

            <Warning>
                <strong>Voltagem máxima segura:</strong>
                <br />• Ryzen 3000/5000: <Code>1.325V</Code> em carga all-core
                <br />• Ryzen 7000: <Code>1.35V</Code> em carga all-core
                <br />Voltagens superiores causam degradação acelerada.
            </Warning>

            <Section title="Método 1: PBO + Curve Optimizer (Recomendado)">
                <p>
                    Esta é a melhor abordagem para a maioria dos utilizadores. Mantém o boost
                    single-core alto (importante para jogos) enquanto melhora performance geral.
                </p>

                <Step number="1" title="Ativar PBO na BIOS">
                    Vai à secção de overclock/AMD Overclocking. Define PBO como "Enabled" ou
                    "Advanced" para controlo manual dos limites.
                </Step>

                <Step number="2" title="Configurar Limites (PPT, TDC, EDC)">
                    Define os limites de potência. Valores recomendados por CPU:
                </Step>

                <ConfigList items={[
                    { field: 'Ryzen 5 5600X', value: 'PPT: 100W, TDC: 75A, EDC: 115A' },
                    { field: 'Ryzen 7 5800X', value: 'PPT: 140W, TDC: 95A, EDC: 145A' },
                    { field: 'Ryzen 9 5900X', value: 'PPT: 180W, TDC: 120A, EDC: 175A' },
                    { field: 'Ryzen 9 5950X', value: 'PPT: 200W, TDC: 140A, EDC: 190A' },
                    { field: 'Ryzen 7 7700X', value: 'PPT: 150W, TDC: 110A, EDC: 160A' },
                    { field: 'Ryzen 9 7900X/7950X', value: 'PPT: 230W, TDC: 160A, EDC: 220A' },
                ]} />

                <Step number="3" title="Curve Optimizer - All Core">
                    Localiza "Curve Optimizer" na BIOS (AMD Overclocking → PBO). Define
                    <Code>-15</Code> para todos os cores como ponto de partida conservador.
                </Step>

                <Step number="4" title="Testar Estabilidade">
                    Arranca o Windows e corre <Code>Cinebench R23 Multi-Core</Code> 3 vezes seguidas.
                    Sem crashes = estável. Aumenta para <Code>-20</Code>.
                </Step>

                <Step number="5" title="Encontrar Limite All-Core">
                    Continua a aumentar o offset negativo (-25, -30) até encontrar instabilidade.
                    Depois recua 5 unidades.
                </Step>

                <Step number="6" title="Testar Single-Core">
                    Corre Cinebench R23 Single-Core. Single usa clocks mais altos e pode ser
                    instável mesmo com multi estável.
                </Step>

                <Step number="7" title="Testar Idle/Baixa Carga">
                    Alguns cores são instáveis em frequências baixas. Deixa o PC em idle durante
                    30 min. Se crashar, o core problemático precisa de menos undervolt.
                </Step>
            </Section>

            <Section title="Curve Optimizer Per-Core (Avançado)">
                <p>
                    Para extrair máximo desempenho, otimiza cada core individualmente:
                </p>
                <ConfigList items={[
                    { field: 'Best Core (★)', value: '-10 a -15 (mais conservador)' },
                    { field: '2º Melhor', value: '-15 a -20' },
                    { field: 'Outros', value: '-20 a -30' },
                ]} />

                <Tip title="Ferramenta Essencial">
                    Usa o <strong>CoreCycler</strong> para testar cada core automaticamente.
                    Deixa correr durante a noite - ele identifica exatamente que cores são instáveis.
                </Tip>

                <p><strong>Processo com CoreCycler:</strong></p>
                <Step number="1">Download CoreCycler e extrai para uma pasta.</Step>
                <Step number="2">Configura para testar cada core durante 10-15 minutos.</Step>
                <Step number="3">Deixa correr durante a noite (8+ horas).</Step>
                <Step number="4">Verifica o log - cores que falharam precisam de menos undervolt.</Step>
                <Step number="5">Ajusta os cores problemáticos (+5) e retesta.</Step>
            </Section>

            <Section title="Scalar e Boost Override">
                <p>
                    Além do Curve Optimizer, tens mais opções PBO:
                </p>
                <ConfigList items={[
                    { field: 'PBO Scalar', value: '1x-10x - Quanto "força" o boost (mais agressivo = mais calor)' },
                    { field: 'Boost Override', value: '+0 a +200MHz - Adiciona ao boost máximo' },
                ]} />

                <p><strong>Recomendações:</strong></p>
                <ConfigList items={[
                    { field: 'Scalar', value: 'Deixa em Auto ou 1x (valores altos = muito calor)' },
                    { field: 'Boost Override', value: '+50 a +100 MHz (se temps permitirem)' },
                    { field: 'Foco', value: 'Curve Optimizer é mais eficaz que Scalar' },
                ]} />
            </Section>

            <Section title="Método 2: OC Manual All-Core">
                <p>
                    Só recomendado para workloads pesados de renderização/codificação 24/7:
                </p>

                <Step number="1" title="Desativar PBO">
                    Define PBO como "Disabled" na BIOS para ter controlo manual total.
                </Step>

                <Step number="2" title="Definir Frequência">
                    Em "CPU Core Ratio" ou "Multiplier", define um valor fixo. Exemplo para 5800X:
                    <Code>46</Code> (4.6 GHz).
                </Step>

                <Step number="3" title="Voltagem Manual">
                    Define VCore como "Manual" e começa com <Code>1.25V</Code>. Testa estabilidade.
                </Step>

                <Step number="4" title="Ajustar Voltagem">
                    Se instável, aumenta em <Code>0.025V</Code>. Repete até estável.
                    Nunca excedas 1.325V para uso diário.
                </Step>

                <Step number="5" title="LLC">
                    Define LLC para Level 3-4 para voltagem estável sob carga.
                </Step>

                <Warning>
                    OC manual perde completamente o boost single-core. Para gaming, isto
                    pode significar MENOS FPS do que stock com PBO.
                </Warning>
            </Section>

            <Section title="FCLK - Infinity Fabric">
                <p>
                    O Infinity Fabric conecta os CCDs (blocos de cores). Sincronizá-lo com a RAM
                    melhora latência:
                </p>
                <ConfigList items={[
                    { field: 'FCLK', value: 'Frequência do Infinity Fabric' },
                    { field: 'MCLK', value: 'Frequência da memória RAM' },
                    { field: 'Ratio 1:1', value: 'FCLK = MCLK (óptimo)' },
                    { field: 'Exemplo (DDR4)', value: 'RAM 3600MHz = FCLK 1800MHz' },
                    { field: 'Exemplo (DDR5)', value: 'RAM 6000MHz = FCLK 3000MHz (se estável)' },
                ]} />

                <Tip>
                    Nem todos os CPUs conseguem FCLK alto. Para Ryzen 5000 com DDR4,
                    1800-1900MHz é geralmente o limite. Para 7000 com DDR5, 2000-3000MHz varia.
                </Tip>
            </Section>

            <Section title="Resolução de Problemas">
                <ConfigList items={[
                    { field: 'WHEA errors (Event Viewer)', value: 'Curve Optimizer muito agressivo em algum core' },
                    { field: 'Crash em idle', value: 'Core instável em baixa freq - usa +5 nesse core' },
                    { field: 'Crash em single-core bench', value: 'Best cores precisam de menos undervolt' },
                    { field: 'Crash em jogos específicos', value: 'Alguns jogos stressam cores específicos' },
                    { field: 'Reboots aleatórios', value: 'Pode ser FCLK instável - baixa 100MHz' },
                ]} />
            </Section>

            <Tip title="Dica Final">
                Depois de encontrar valores estáveis, guarda um perfil da BIOS. A maioria das
                motherboards permite guardar múltiplos perfis para fácil recuperação.
            </Tip>
        </GuideLayout>
    )
}

export default OcCpuAmd
