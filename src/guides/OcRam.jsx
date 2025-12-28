// =====================================================
// RAM OVERCLOCK GUIDE - Complete
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, Code, ConfigList } from './GuideLayout'

const OcRam = ({ onBack }) => {
    return (
        <GuideLayout
            title="Overclock de RAM"
            subtitle="XMP, EXPO, timings e frequency tuning - maximiza a largura de banda da memória"
            difficulty="Avançado"
            readTime="30 min"
            onBack={onBack}
        >
            <Section title="Importância do OC de RAM">
                <p>
                    A memória RAM é frequentemente o gargalo ignorado. Frequências mais altas e
                    latências mais baixas melhoram desempenho em jogos (1% lows especialmente),
                    produtividade e responsividade geral do sistema.
                </p>
                <ConfigList items={[
                    { field: 'Ganho típico (jogos)', value: '3-10% mais FPS (varia muito por jogo)' },
                    { field: 'Maior impacto', value: 'CPUs AMD Ryzen beneficiam mais' },
                    { field: 'Risco', value: 'Baixo - RAM instável causa crashes, não danos' },
                ]} />
            </Section>

            <Warning>
                RAM instável pode causar corrupção de dados se não for detetada.
                <strong>SEMPRE</strong> testa exaustivamente com MemTest86 ou TM5/ANTA antes
                de considerar estável.
            </Warning>

            <Section title="Terminologia Essencial">
                <ConfigList items={[
                    { field: 'Frequência', value: 'Velocidade em MHz (ex: DDR4-3600, DDR5-6000)' },
                    { field: 'Timings', value: 'Latências em ciclos (CL-tRCD-tRP-tRAS)' },
                    { field: 'CAS Latency (CL)', value: 'Timing mais importante - menor = melhor' },
                    { field: 'XMP/EXPO', value: 'Perfis pré-definidos pelo fabricante' },
                    { field: 'VDIMM', value: 'Voltagem da RAM' },
                    { field: 'Rank', value: 'Single rank (SR) ou Dual rank (DR)' },
                    { field: 'IC/Die', value: 'Chip de memória usado (Samsung B-die, Hynix, etc)' },
                ]} />

                <p><strong>Como ler timings (exemplo DDR4-3600 CL16):</strong></p>
                <ConfigList items={[
                    { field: 'CL (CAS Latency)', value: '16 - ciclos para o primeiro dado' },
                    { field: 'tRCD', value: 'Row to Column Delay' },
                    { field: 'tRP', value: 'Row Precharge Time' },
                    { field: 'tRAS', value: 'Row Active Time' },
                    { field: 'Formato completo', value: '16-19-19-39 a 1.35V' },
                ]} />
            </Section>

            <Section title="Nível 1: Ativar XMP/EXPO">
                <p>
                    O primeiro passo - e suficiente para a maioria - é simplesmente ativar o
                    perfil XMP ou EXPO na BIOS:
                </p>
                <Step number="1" title="Aceder à BIOS">
                    Reinicia e entra na BIOS (DEL ou F2).
                </Step>
                <Step number="2" title="Localizar XMP/EXPO">
                    Procura "XMP", "D.O.C.P." (ASUS AMD), ou "EXPO" no menu de memória ou OC.
                </Step>
                <Step number="3" title="Selecionar Profile">
                    Escolhe "Profile 1" (velocidade máxima) ou "Profile 2" (se existir alternativa).
                </Step>
                <Step number="4" title="Guardar e Reiniciar">
                    F10 para guardar. O sistema reinicia com RAM à velocidade rated.
                </Step>
                <Step number="5" title="Verificar">
                    No Windows, abre CPU-Z → aba "Memory". A frequência mostrada × 2 = velocidade DDR.
                </Step>

                <Tip>
                    Se o sistema não arrancar após XMP, faz Clear CMOS e tenta um perfil mais
                    conservador, ou desativa e verifica compatibilidade no site da motherboard (QVL).
                </Tip>
            </Section>

            <Section title="Nível 2: Frequência Manual">
                <p>
                    Algumas RAM conseguem ir além do XMP. O processo:
                </p>
                <Step number="1" title="Ativar XMP">
                    Começa com XMP ativo como baseline.
                </Step>
                <Step number="2" title="Aumentar Frequência">
                    Aumenta a frequência um degrau (ex: 3600 → 3800MHz). Mantém timings iguais.
                </Step>
                <Step number="3" title="Aumentar VDIMM se Necessário">
                    Se não arrancar/estável, aumenta VDIMM em <Code>+0.02V</Code> (ex: 1.35 → 1.37V).
                </Step>
                <Step number="4" title="Testar">
                    Corre MemTest86 ou TM5/ANTA durante 30+ minutos por cada alteração.
                </Step>
                <Step number="5" title="Limites de VDIMM">
                    DDR4: máx <Code>1.50V</Code> (1.45V para uso diário)
                    <br />DDR5: máx <Code>1.45V</Code> (1.40V para uso diário)
                </Step>
            </Section>

            <Section title="FCLK (AMD) / Gear Mode (Intel)">
                <p><strong>AMD Ryzen - FCLK:</strong></p>
                <p>
                    O Infinity Fabric (FCLK) deve estar sincronizado com a RAM (ratio 1:1)
                    para mínima latência:
                </p>
                <ConfigList items={[
                    { field: 'DDR4-3600', value: 'FCLK 1800MHz' },
                    { field: 'DDR4-3800', value: 'FCLK 1900MHz (limite típico Ryzen 3000/5000)' },
                    { field: 'DDR5-6000', value: 'FCLK 3000MHz (limite típico Ryzen 7000)' },
                ]} />

                <p><strong>Intel - Gear Mode:</strong></p>
                <ConfigList items={[
                    { field: 'Gear 1', value: '1:1 - melhor latência (até ~DDR4-3600/DDR5-5600)' },
                    { field: 'Gear 2', value: '1:2 - necessário para frequências altas' },
                    { field: 'Gear 4', value: '1:4 - para DDR5 extremo (7000MHz+)' },
                ]} />
            </Section>

            <Section title="Nível 3: Ajustar Timings (Avançado)">
                <p>
                    Timings mais apertados melhoram latência e performance. Foca nestes por ordem:
                </p>

                <p><strong>Primários (maior impacto):</strong></p>
                <ConfigList items={[
                    { field: 'CL (CAS Latency)', value: 'Principal - menor = melhor' },
                    { field: 'tRCD', value: 'Row to Column Delay' },
                    { field: 'tRP', value: 'Row Precharge' },
                    { field: 'tRAS', value: 'Geralmente CL + tRCD + algo' },
                ]} />

                <p><strong>Secundários (impacto moderado):</strong></p>
                <ConfigList items={[
                    { field: 'tRFC', value: 'Refresh Cycle - grande impacto, difícil de apertar' },
                    { field: 'tFAW', value: 'Four Activate Window' },
                    { field: 'tWR', value: 'Write Recovery' },
                ]} />

                <Step number="1" title="Metodologia">
                    Ajusta UM timing de cada vez. Reduz em 1-2 ciclos, testa extensivamente,
                    e só depois passa ao próximo.
                </Step>

                <Warning>
                    Tuning de timings é muito demorado (horas de teste por timing).
                    Para a maioria, XMP ou frequência manual é suficiente.
                </Warning>
            </Section>

            <Section title="Teste de Estabilidade - Obrigatório">
                <p>
                    RAM instável pode parecer funcionar mas causar corrupção de dados.
                    <strong>Testa sempre:</strong>
                </p>
                <ConfigList items={[
                    { field: 'MemTest86', value: 'Boot de USB, 4+ passes (2-4 horas)' },
                    { field: 'TestMem5 (TM5)', value: 'Windows, config ANTA extreme (1-2 horas)' },
                    { field: 'Karhu RAM Test', value: 'Pago mas muito eficaz' },
                    { field: 'OCCT Memory', value: 'Alternativa gratuita no Windows' },
                ]} />

                <Step number="1">Após cada alteração, corre TM5/ANTA durante pelo menos 30 min.</Step>
                <Step number="2">Depois de finalizar OC, corre MemTest86 durante a noite (8+ horas).</Step>
                <Step number="3">Se encontrar erros, recua a última alteração e retesta.</Step>
            </Section>

            <Section title="Dicas por Tipo de IC">
                <ConfigList items={[
                    { field: 'Samsung B-die (DDR4)', value: 'Melhor para OC, aceita voltagem alta' },
                    { field: 'Hynix CJR/DJR', value: 'Bom OC, limite ~1.45V' },
                    { field: 'Micron E-die', value: 'Escala bem com voltagem' },
                    { field: 'Samsung (DDR5)', value: 'Comum em kits ~5600-6400MHz' },
                    { field: 'Hynix A-die (DDR5)', value: 'Melhor para DDR5, 7000MHz+ possível' },
                    { field: 'Hynix M-die (DDR5)', value: 'Excelente para frequências extremas' },
                ]} />

                <Tip>
                    Usa Thaiphoon Burner (gratuito) para identificar o IC do teu kit de RAM.
                </Tip>
            </Section>

            <Section title="Resolução de Problemas">
                <ConfigList items={[
                    { field: 'Não arranca após XMP', value: 'RAM incompatível - verifica QVL ou baixa freq' },
                    { field: 'Erros em MemTest', value: 'Freq muito alta ou timings agressivos - recua' },
                    { field: 'BSOD aleatórios', value: 'RAM instável é causa comum - testa bem' },
                    { field: 'Apenas 1 stick funciona', value: 'Problema de slot ou IMC - testa cada slot' },
                    { field: 'XMP só funciona em 2 slots', value: 'Normal - 4 DIMMs mais difícil de estabilizar' },
                ]} />
            </Section>
        </GuideLayout>
    )
}

export default OcRam
