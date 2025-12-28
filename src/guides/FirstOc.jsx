// =====================================================
// PRIMEIRO OVERCLOCK - Beginner's Guide
// =====================================================

import GuideLayout, { Section, Step, Warning, Tip, ConfigList } from './GuideLayout'

const FirstOc = ({ onBack }) => {
    return (
        <GuideLayout
            title="Primeiro Overclock"
            subtitle="Guia completo para iniciantes - tudo o que precisas saber antes de começar"
            difficulty="Iniciante"
            readTime="15 min"
            onBack={onBack}
        >
            <Section title="O que é Overclock?">
                <p>
                    Overclock é o processo de <strong>aumentar a velocidade</strong> do teu hardware
                    além das especificações de fábrica. Isto resulta em mais performance,
                    mas também mais calor e consumo de energia.
                </p>
                <p>
                    A boa notícia: com hardware moderno e as técnicas certas, overclock é
                    <strong> seguro e acessível</strong> para qualquer pessoa.
                </p>
            </Section>

            <Section title="O que podes fazer Overclock?">
                <ConfigList items={[
                    { field: 'CPU', value: 'Mais performance em jogos e aplicações' },
                    { field: 'GPU', value: 'Mais FPS em jogos - o mais comum e fácil' },
                    { field: 'RAM', value: 'Melhor latência e bandwidth - ajuda CPU e jogos' },
                ]} />
                <Tip>
                    Recomendo começar pela <strong>GPU</strong> - é o mais fácil, seguro,
                    e dá resultados imediatos em jogos.
                </Tip>
            </Section>

            <Section title="O que Precisas">
                <ConfigList items={[
                    { field: 'Hardware compatível', value: 'A maioria das GPUs e CPUs "K" suportam OC' },
                    { field: 'Arrefecimento adequado', value: 'Stock cooler pode não ser suficiente para CPU OC' },
                    { field: 'Software de OC', value: 'MSI Afterburner (GPU), Ryzen Master/XTU (CPU)' },
                    { field: 'Software de monitorização', value: 'HWiNFO64 para ver temperaturas' },
                    { field: 'Stress tests', value: 'Para validar estabilidade' },
                    { field: 'Paciência', value: 'OC é um processo iterativo' },
                ]} />
            </Section>

            <Section title="Conceitos Básicos">
                <p><strong>Frequência (Clock)</strong></p>
                <p>
                    Medida em MHz ou GHz - quanto maior, mais operações por segundo.
                    Uma GPU a 2000 MHz é mais rápida que a mesma GPU a 1800 MHz.
                </p>

                <p><strong>Voltagem</strong></p>
                <p>
                    A "energia" que alimenta o chip. Mais frequência geralmente precisa de mais voltagem.
                    Mais voltagem = mais calor. É o principal limitador de OC.
                </p>

                <p><strong>Temperatura</strong></p>
                <p>
                    O calor gerado. Há limites seguros - ultrapassá-los causa throttling
                    (redução automática de velocidade) ou danos.
                </p>

                <p><strong>Estabilidade</strong></p>
                <p>
                    Um OC estável não causa crashes, erros ou artefactos visuais.
                    Testar estabilidade é essencial.
                </p>
            </Section>

            <Section title="Limites Seguros">
                <p><strong>Temperaturas máximas recomendadas:</strong></p>
                <ConfigList items={[
                    { field: 'GPU', value: '80-85°C (Hot Spot até 95°C)' },
                    { field: 'CPU Intel', value: '85-90°C' },
                    { field: 'CPU AMD Ryzen', value: '85-90°C (Tjmax é 95°C)' },
                    { field: 'VRAM GPU', value: '100-105°C (gddr6x aquece muito)' },
                ]} />
                <Warning>
                    Estes são limites máximos. Ideal é ficar 5-10°C abaixo para longevidade.
                </Warning>
            </Section>

            <Section title="Workflow Básico de OC">
                <Step number="1" title="Benchmark Stock">
                    Antes de qualquer alteração, corre benchmarks e anota os resultados base.
                </Step>
                <Step number="2" title="Aumentar Gradualmente">
                    Aumenta frequência em pequenos passos (25-50 MHz GPU, 100 MHz CPU).
                </Step>
                <Step number="3" title="Testar Estabilidade">
                    Após cada aumento, corre um stress test curto (5-10 min).
                </Step>
                <Step number="4" title="Monitorizar">
                    Observa temperaturas, voltagem e comportamento.
                </Step>
                <Step number="5" title="Repetir">
                    Continua até encontrar instabilidade, depois recua um passo.
                </Step>
                <Step number="6" title="Validar">
                    Com o OC final, corre stress tests longos (1+ hora).
                </Step>
            </Section>

            <Section title="Sinais de Instabilidade">
                <ConfigList items={[
                    { field: 'Crash/freeze', value: 'O sistema para completamente' },
                    { field: 'Artefactos visuais', value: 'Pixels coloridos, linhas, flickering' },
                    { field: 'Driver crash', value: 'Ecrã preto momentâneo + mensagem de erro' },
                    { field: 'BSOD', value: 'Blue Screen of Death - erro crítico' },
                    { field: 'Erros em testes', value: 'Prime95, OCCT ou outros reportam erros' },
                ]} />
            </Section>

            <Section title="Próximos Passos">
                <p>Agora que entendes os conceitos, escolhe por onde começar:</p>
                <ConfigList items={[
                    { field: '→ Overclock de GPU', value: 'O mais fácil - começa aqui!' },
                    { field: '→ BIOS para Overclock', value: 'Aprende as configurações essenciais' },
                    { field: '→ MSI Afterburner', value: 'Aprende a usar o software de GPU OC' },
                ]} />
            </Section>

            <Warning>
                Overclock pode anular garantias e, se feito incorretamente, danificar hardware.
                Segue sempre os limites seguros e aumenta gradualmente!
            </Warning>
        </GuideLayout>
    )
}

export default FirstOc
