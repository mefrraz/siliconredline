// =====================================================
// STABILITY TESTING GUIDE - Validate your OC
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const Stability = ({ onBack }) => {
    return (
        <GuideLayout
            title="Testes de Estabilidade"
            subtitle="Como validar que o teu overclock é realmente estável para uso diário"
            difficulty="Médio"
            readTime="18 min"
            onBack={onBack}
        >
            <Section title="Porque Testar Estabilidade?">
                <p>
                    Um overclock pode parecer funcionar, mas ter erros subtis que causam
                    <strong> corrupção de dados, crashes aleatórios</strong> ou degradação
                    de performance ao longo do tempo.
                </p>
                <p>
                    Testar estabilidade garante que o OC é seguro para uso diário.
                </p>
            </Section>

            <Section title="Quando Testar?">
                <ConfigList items={[
                    { field: 'Após cada aumento', value: 'Teste rápido de 5-10 min' },
                    { field: 'Após encontrar o máximo', value: 'Teste médio de 30-60 min' },
                    { field: 'OC final', value: 'Teste longo de 2-8 horas' },
                    { field: 'Após mudanças de BIOS', value: 'Verificar que nada foi afetado' },
                ]} />
            </Section>

            <Section title="Níveis de Teste">
                <p><strong>Nível 1: Teste Rápido (5-10 min)</strong></p>
                <p>
                    Durante ajustes. Apenas para encontrar instabilidade óbvia.
                    Não significa que está estável, apenas que não crashou imediatamente.
                </p>

                <p><strong>Nível 2: Teste Básico (30-60 min)</strong></p>
                <p>
                    Após definir OC preliminar. Encontra a maioria dos problemas.
                    Bom indicador de que o OC é viável.
                </p>

                <p><strong>Nível 3: Teste Completo (2-8+ horas)</strong></p>
                <p>
                    Para validação final. Se passar, o OC é provavelmente estável
                    para qualquer uso normal.
                </p>
            </Section>

            <Section title="Stress Tests para CPU">
                <ConfigList items={[
                    { field: 'Prime95 Small FFTs', value: 'Mais intenso, testa limites absolutos' },
                    { field: 'Prime95 Large FFTs', value: 'Testa CPU + RAM juntos' },
                    { field: 'OCCT CPU', value: 'Bom equilíbrio, deteta erros' },
                    { field: 'Cinebench Loop', value: 'Carga realista de rendering' },
                    { field: 'y-cruncher', value: 'Muito intenso, encontra erros difíceis' },
                ]} />
                <Tip>
                    Prime95 é mais intenso que uso real. Se falhar apenas em Prime95
                    mas passar em tudo o resto, pode ainda ser usável no dia-a-dia.
                </Tip>
            </Section>

            <Section title="Stress Tests para GPU">
                <ConfigList items={[
                    { field: 'FurMark', value: 'Stress térmico extremo' },
                    { field: 'Unigine Heaven/Superposition', value: 'Carga realista, loop infinito' },
                    { field: '3DMark Stress Test', value: 'Benchmark em loop, mede variância' },
                    { field: 'Gaming 2+ horas', value: 'O teste mais realista' },
                ]} />
            </Section>

            <Section title="Stress Tests para RAM">
                <ConfigList items={[
                    { field: 'MemTest86', value: 'Boot de USB, teste profundo' },
                    { field: 'TestMem5', value: 'Teste rápido dentro do Windows' },
                    { field: 'OCCT Memory', value: 'Testa RAM sob carga' },
                    { field: 'Karhu RAM Test', value: 'Pago, muito eficaz' },
                ]} />
                <Warning>
                    RAM instável é perigosa! Pode causar corrupção de ficheiros silenciosa.
                    Testa bem OC de RAM.
                </Warning>
            </Section>

            <Section title="Metodologia Recomendada">
                <Step number="1" title="Preparar">
                    Fecha outras aplicações. Abre HWiNFO para monitorizar.
                    Reseta estatísticas min/max.
                </Step>
                <Step number="2" title="CPU Primeiro">
                    Se fizeste OC de CPU, testa primeiro com Prime95 ou OCCT.
                </Step>
                <Step number="3" title="RAM">
                    Se OC de RAM, corre TestMem5 ou MemTest86.
                </Step>
                <Step number="4" title="GPU">
                    Testa GPU com Heaven ou 3DMark em loop.
                </Step>
                <Step number="5" title="Teste Misto">
                    Finalmente, testa tudo junto: jogo pesado por 2+ horas.
                </Step>
                <Step number="6" title="Validar Temps">
                    Após teste, verifica temps máximas no HWiNFO.
                    Devem estar dentro dos limites seguros.
                </Step>
            </Section>

            <Section title="Sinais de Sucesso">
                <ConfigList items={[
                    { field: 'Sem crashes', value: 'Completou o tempo todo sem erros' },
                    { field: 'Sem erros reportados', value: 'OCCT/Prime95 não mostraram erros' },
                    { field: 'Temps estáveis', value: 'Não subiram indefinidamente' },
                    { field: 'Performance consistente', value: 'Scores semelhantes em cada loop' },
                    { field: 'Sem WHEA errors', value: 'Verificar Event Viewer' },
                ]} />
            </Section>

            <Section title="Sinais de Falha">
                <ConfigList items={[
                    { field: 'Crash/freeze', value: 'Instabilidade clara' },
                    { field: 'BSOD', value: 'Erro crítico - anota o código' },
                    { field: 'Worker stopped (Prime95)', value: 'Erro de cálculo' },
                    { field: 'Artefactos visuais', value: 'GPU instável' },
                    { field: 'WHEA errors', value: 'Erros de hardware no Event Viewer' },
                    { field: 'Performance degradada', value: 'Os scores vão baixando - throttling' },
                ]} />
            </Section>

            <Section title="O que fazer se falhar?">
                <Step number="1" title="Reduzir OC">
                    Baixa frequência 25-50 MHz ou aumenta voltagem ligeiramente.
                </Step>
                <Step number="2" title="Testar Novamente">
                    Corre o mesmo teste.
                </Step>
                <Step number="3" title="Repetir">
                    Continua até encontrar o sweet spot estável.
                </Step>
                <Tip>
                    É melhor ter um OC mais modesto mas 100% estável do que um OC agressivo
                    que falha ocasionalmente.
                </Tip>
            </Section>
        </GuideLayout>
    )
}

export default Stability
