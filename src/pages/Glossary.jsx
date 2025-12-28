// =====================================================
// GLOSSARY PAGE - 200+ Overclock Terms
// =====================================================

import { useState, useMemo } from 'react'
import { SearchIcon, ListIcon } from '../components/Icons'

// Glossary data organized by category
const GLOSSARY_DATA = [
    // ==================== GENERAL ====================
    { term: 'Overclock (OC)', def: 'Aumentar a frequência de funcionamento além dos valores de fábrica para obter mais performance.', cat: 'Geral' },
    { term: 'Undervolt', def: 'Reduzir a voltagem mantendo a mesma frequência, resultando em menos calor e consumo.', cat: 'Geral' },
    { term: 'Stock', def: 'Configurações originais de fábrica do componente.', cat: 'Geral' },
    { term: 'Silicon Lottery', def: 'Variação natural entre chips do mesmo modelo - alguns overclocam melhor que outros.', cat: 'Geral' },
    { term: 'Binning', def: 'Processo de seleção de chips por qualidade durante fabrico.', cat: 'Geral' },
    { term: 'Stable', def: 'Configuração que funciona sem crashes ou erros durante uso prolongado.', cat: 'Geral' },
    { term: 'Benchmark', def: 'Teste padronizado para medir e comparar performance.', cat: 'Geral' },
    { term: 'Stress Test', def: 'Teste intensivo para verificar estabilidade sob carga máxima.', cat: 'Geral' },
    { term: 'Baseline', def: 'Performance ou configuração de referência antes de alterações.', cat: 'Geral' },
    { term: 'Throttling', def: 'Redução automática de frequência para proteger contra calor ou consumo excessivo.', cat: 'Geral' },
    { term: 'Degradação', def: 'Perda gradual de capacidade do chip ao longo do tempo devido a stress excessivo.', cat: 'Geral' },
    { term: 'Safe Daily', def: 'Configuração segura para uso contínuo 24/7 sem risco de degradação.', cat: 'Geral' },
    { term: 'BSOD', def: 'Blue Screen of Death - crash do Windows indicando erro crítico.', cat: 'Geral' },
    { term: 'Driver Crash', def: 'Falha do driver gráfico, geralmente resultando em tela preta temporária.', cat: 'Geral' },
    { term: 'Artefactos', def: 'Anomalias visuais (linhas, pontos, cores erradas) indicando instabilidade gráfica.', cat: 'Geral' },
    { term: 'Bottleneck', def: 'Componente que limita a performance do sistema como um todo.', cat: 'Geral' },
    { term: 'Headroom', def: 'Margem disponível para overclock além dos valores atuais.', cat: 'Geral' },
    { term: 'Default', def: 'Valores pré-definidos, geralmente de fábrica.', cat: 'Geral' },
    { term: 'Profile', def: 'Conjunto de configurações guardadas para aplicar rapidamente.', cat: 'Geral' },
    { term: 'Offset', def: 'Valor adicionado ou subtraído a uma configuração base.', cat: 'Geral' },

    // ==================== FREQUÊNCIAS ====================
    { term: 'Clock', def: 'Frequência de operação de um componente, medida em MHz ou GHz.', cat: 'Frequências' },
    { term: 'MHz', def: 'Megahertz - milhões de ciclos por segundo.', cat: 'Frequências' },
    { term: 'GHz', def: 'Gigahertz - mil milhões de ciclos por segundo.', cat: 'Frequências' },
    { term: 'Base Clock', def: 'Frequência garantida mínima de operação.', cat: 'Frequências' },
    { term: 'Boost Clock', def: 'Frequência máxima atingida automaticamente quando há margem térmica/potência.', cat: 'Frequências' },
    { term: 'BCLK', def: 'Base Clock - frequência base do sistema, tipicamente 100MHz.', cat: 'Frequências' },
    { term: 'Ratio/Multiplier', def: 'Multiplicador que define a frequência (BCLK × Ratio = Clock).', cat: 'Frequências' },
    { term: 'Core Clock', def: 'Frequência do núcleo principal do processador ou GPU.', cat: 'Frequências' },
    { term: 'Memory Clock', def: 'Frequência da memória (RAM ou VRAM).', cat: 'Frequências' },
    { term: 'Effective Clock', def: 'Frequência real durante operação (pode variar do boost teórico).', cat: 'Frequências' },
    { term: 'All-Core', def: 'Frequência quando todos os cores estão ativos sob carga.', cat: 'Frequências' },
    { term: 'Single-Core', def: 'Frequência máxima quando apenas um core está ativo (geralmente mais alta).', cat: 'Frequências' },
    { term: 'Ring/Cache Ratio', def: 'Frequência do barramento de cache L3 (Intel).', cat: 'Frequências' },
    { term: 'FCLK', def: 'Infinity Fabric Clock - frequência do interconector entre componentes (AMD).', cat: 'Frequências' },
    { term: 'UCLK', def: 'Unified Memory Controller Clock (AMD).', cat: 'Frequências' },
    { term: 'MCLK', def: 'Memory Clock - frequência do controlador de memória.', cat: 'Frequências' },
    { term: 'Async', def: 'Modo assíncrono onde FCLK e MCLK não estão sincronizados (menos eficiente).', cat: 'Frequências' },
    { term: 'Sync 1:1', def: 'Modo sincronizado onde FCLK = MCLK (melhor latência).', cat: 'Frequências' },

    // ==================== VOLTAGEM ====================
    { term: 'Voltage', def: 'Diferença de potencial elétrico, medida em Volts (V) ou milivolts (mV).', cat: 'Voltagem' },
    { term: 'VCore', def: 'Voltagem principal fornecida aos cores do CPU.', cat: 'Voltagem' },
    { term: 'VDIMM', def: 'Voltagem fornecida aos módulos de memória RAM.', cat: 'Voltagem' },
    { term: 'VDDQ', def: 'Voltagem do barramento de dados da memória.', cat: 'Voltagem' },
    { term: 'VDD', def: 'Voltagem de alimentação principal.', cat: 'Voltagem' },
    { term: 'VDDG', def: 'Voltagem do Infinity Fabric (AMD).', cat: 'Voltagem' },
    { term: 'VDDP', def: 'Voltagem do controlador de memória (AMD).', cat: 'Voltagem' },
    { term: 'VSOC', def: 'Voltagem do SoC/uncore (AMD).', cat: 'Voltagem' },
    { term: 'VID', def: 'Voltage Identification - voltagem pedida pelo CPU à motherboard.', cat: 'Voltagem' },
    { term: 'Vdroop', def: 'Queda de voltagem quando o CPU está sob carga.', cat: 'Voltagem' },
    { term: 'LLC', def: 'Load Line Calibration - compensa o Vdroop para manter voltagem estável.', cat: 'Voltagem' },
    { term: 'Adaptive', def: 'Modo de voltagem que varia dinamicamente com a carga.', cat: 'Voltagem' },
    { term: 'Override/Manual', def: 'Modo de voltagem fixa definida pelo utilizador.', cat: 'Voltagem' },
    { term: 'Offset Mode', def: 'Adiciona ou subtrai mV da voltagem automática.', cat: 'Voltagem' },
    { term: 'DVID', def: 'Dynamic VID - offset de voltagem (AMD).', cat: 'Voltagem' },
    { term: 'Overshoot', def: 'Pico momentâneo de voltagem acima do valor definido.', cat: 'Voltagem' },
    { term: 'Undershoot', def: 'Queda momentânea de voltagem abaixo do valor definido.', cat: 'Voltagem' },
    { term: 'Transient', def: 'Mudança rápida e temporária de voltagem.', cat: 'Voltagem' },

    // ==================== POTÊNCIA ====================
    { term: 'TDP', def: 'Thermal Design Power - potência térmica nominal para design de arrefecimento.', cat: 'Potência' },
    { term: 'TBP', def: 'Typical Board Power - consumo típico da placa gráfica.', cat: 'Potência' },
    { term: 'PL1', def: 'Power Limit 1 - limite de potência sustentado (Intel).', cat: 'Potência' },
    { term: 'PL2', def: 'Power Limit 2 - limite de potência burst curto prazo (Intel).', cat: 'Potência' },
    { term: 'Tau', def: 'Tempo que PL2 pode ser mantido antes de baixar para PL1.', cat: 'Potência' },
    { term: 'PPT', def: 'Package Power Tracking - limite de potência total (AMD).', cat: 'Potência' },
    { term: 'TDC', def: 'Thermal Design Current - limite de corrente sustentada (AMD).', cat: 'Potência' },
    { term: 'EDC', def: 'Electrical Design Current - limite de corrente de pico (AMD).', cat: 'Potência' },
    { term: 'IccMax', def: 'Corrente máxima permitida aos VRMs.', cat: 'Potência' },
    { term: 'Power Throttling', def: 'Redução de clocks por atingir limite de potência.', cat: 'Potência' },
    { term: 'Power Limit', def: 'Limite máximo de consumo em Watts.', cat: 'Potência' },
    { term: 'watt (W)', def: 'Unidade de potência (Volts × Amperes).', cat: 'Potência' },
    { term: 'Ampere (A)', def: 'Unidade de corrente elétrica.', cat: 'Potência' },

    // ==================== TEMPERATURA ====================
    { term: 'Tdie', def: 'Temperatura do die/chip do processador.', cat: 'Temperatura' },
    { term: 'Tctl', def: 'Temperatura de controlo reportada (AMD), pode ter offset.', cat: 'Temperatura' },
    { term: 'Tjmax', def: 'Temperatura máxima de junction antes de throttling ou shutdown.', cat: 'Temperatura' },
    { term: 'Junction Temp', def: 'Temperatura no ponto mais quente do chip.', cat: 'Temperatura' },
    { term: 'Hotspot', def: 'Ponto mais quente do die, especialmente em GPUs.', cat: 'Temperatura' },
    { term: 'Thermal Throttling', def: 'Redução automática de clocks por temperatura excessiva.', cat: 'Temperatura' },
    { term: 'Delta T', def: 'Diferença de temperatura (geralmente entre componente e ambiente).', cat: 'Temperatura' },
    { term: 'Ambient', def: 'Temperatura do ar ambiente.', cat: 'Temperatura' },
    { term: 'Case Temp', def: 'Temperatura interior do case/gabinete.', cat: 'Temperatura' },
    { term: 'VRM Temp', def: 'Temperatura dos reguladores de voltagem da motherboard.', cat: 'Temperatura' },
    { term: 'TIM', def: 'Thermal Interface Material - pasta térmica entre chip e cooler.', cat: 'Temperatura' },
    { term: 'Direct Die', def: 'Cooler aplicado diretamente no die sem IHS.', cat: 'Temperatura' },
    { term: 'Delid', def: 'Remover o IHS para melhor contacto térmico.', cat: 'Temperatura' },
    { term: 'IHS', def: 'Integrated Heat Spreader - tampa metálica sobre o die do CPU.', cat: 'Temperatura' },

    // ==================== CPU ====================
    { term: 'Core', def: 'Unidade de processamento individual dentro do CPU.', cat: 'CPU' },
    { term: 'Thread', def: 'Linha de execução virtual - SMT/HT permite 2 threads por core.', cat: 'CPU' },
    { term: 'SMT', def: 'Simultaneous Multi-Threading - 2 threads por core (AMD).', cat: 'CPU' },
    { term: 'Hyperthreading (HT)', def: 'Tecnologia Intel equivalente a SMT - 2 threads por core.', cat: 'CPU' },
    { term: 'P-Core', def: 'Performance Core - cores grandes de alta performance (Intel híbrido).', cat: 'CPU' },
    { term: 'E-Core', def: 'Efficiency Core - cores pequenos eficientes (Intel híbrido).', cat: 'CPU' },
    { term: 'CCD', def: 'Core Complex Die - chiplet contendo cores (AMD).', cat: 'CPU' },
    { term: 'CCX', def: 'Core Complex - grupo de cores dentro de um CCD (AMD).', cat: 'CPU' },
    { term: 'IOD', def: 'IO Die - chiplet com controlador de memória e I/O (AMD).', cat: 'CPU' },
    { term: 'Infinity Fabric', def: 'Interconector entre componentes nos Ryzen (AMD).', cat: 'CPU' },
    { term: 'Uncore', def: 'Componentes fora dos cores: cache L3, controlador memória, etc.', cat: 'CPU' },
    { term: 'IMC', def: 'Integrated Memory Controller - controlador de memória integrado.', cat: 'CPU' },
    { term: 'Cache L1/L2/L3', def: 'Níveis de memória ultra-rápida dentro do CPU.', cat: 'CPU' },
    { term: '3D V-Cache', def: 'Cache L3 adicional empilhada verticalmente (AMD).', cat: 'CPU' },
    { term: 'PBO', def: 'Precision Boost Overdrive - sistema automático de OC (AMD).', cat: 'CPU' },
    { term: 'Curve Optimizer', def: 'Ajuste da curva V/F por core para undervolt (AMD).', cat: 'CPU' },
    { term: 'PBO Scalar', def: 'Multiplicador de agressividade do PBO (1x-10x).', cat: 'CPU' },
    { term: 'Boost Override', def: 'MHz adicionais ao boost máximo.', cat: 'CPU' },
    { term: 'CO', def: 'Curve Optimizer - abreviatura comum.', cat: 'CPU' },
    { term: 'Best Core', def: 'O core de maior qualidade do chip (marcado com estrela).', cat: 'CPU' },
    { term: 'AVX', def: 'Advanced Vector Extensions - instruções pesadas que geram mais calor.', cat: 'CPU' },
    { term: 'AVX-512', def: 'Versão mais ampla do AVX, muito intensiva.', cat: 'CPU' },
    { term: 'AVX Offset', def: 'Redução de ratio quando AVX está ativo para manter estabilidade.', cat: 'CPU' },
    { term: 'Turbo Boost', def: 'Sistema automático de boost da Intel.', cat: 'CPU' },
    { term: 'Turbo Boost Max 3.0', def: 'Boost extra nos melhores cores (Intel).', cat: 'CPU' },
    { term: 'Thermal Velocity Boost', def: 'Boost adicional quando há margem térmica (Intel).', cat: 'CPU' },
    { term: 'WHEA Error', def: 'Windows Hardware Error Architecture - indica erros de hardware.', cat: 'CPU' },
    { term: 'Machine Check Exception', def: 'Erro crítico de CPU resultando em BSOD.', cat: 'CPU' },

    // ==================== GPU ====================
    { term: 'GPU', def: 'Graphics Processing Unit - processador gráfico.', cat: 'GPU' },
    { term: 'CUDA Cores', def: 'Unidades de processamento paralelo (NVIDIA).', cat: 'GPU' },
    { term: 'Stream Processors', def: 'Unidades de processamento paralelo (AMD).', cat: 'GPU' },
    { term: 'RT Cores', def: 'Núcleos dedicados a Ray Tracing (NVIDIA).', cat: 'GPU' },
    { term: 'Tensor Cores', def: 'Núcleos para AI e DLSS (NVIDIA).', cat: 'GPU' },
    { term: 'Ray Accelerators', def: 'Unidades de Ray Tracing (AMD).', cat: 'GPU' },
    { term: 'VRAM', def: 'Video RAM - memória dedicada da placa gráfica.', cat: 'GPU' },
    { term: 'GDDR6', def: 'Graphics DDR6 - tipo de memória gráfica.', cat: 'GPU' },
    { term: 'GDDR6X', def: 'Versão mais rápida do GDDR6 (NVIDIA).', cat: 'GPU' },
    { term: 'HBM2/HBM3', def: 'High Bandwidth Memory - memória empilhada de alta largura de banda.', cat: 'GPU' },
    { term: 'Memory Bus', def: 'Largura do barramento de memória (ex: 256-bit).', cat: 'GPU' },
    { term: 'Bandwidth', def: 'Largura de banda - quantidade de dados por segundo.', cat: 'GPU' },
    { term: 'Fill Rate', def: 'Taxa de preenchimento de pixels por segundo.', cat: 'GPU' },
    { term: 'Shader Clock', def: 'Frequência dos shaders (pode diferir do core).', cat: 'GPU' },
    { term: 'GPU Boost', def: 'Sistema automático de boost (NVIDIA/AMD).', cat: 'GPU' },
    { term: 'Power Target', def: 'Limite de potência em percentagem (similar a power limit).', cat: 'GPU' },
    { term: 'Voltage Curve', def: 'Curva que define frequência para cada voltagem.', cat: 'GPU' },
    { term: 'V/F Curve', def: 'Voltage/Frequency Curve - editável em Afterburner (Ctrl+F).', cat: 'GPU' },
    { term: 'ECC', def: 'Error Correcting Code - correção de erros na memória.', cat: 'GPU' },
    { term: 'Error Correction', def: 'Correção automática de erros de memória (reduz performance).', cat: 'GPU' },
    { term: 'Resizable BAR', def: 'Permite CPU aceder a toda a VRAM de uma vez.', cat: 'GPU' },
    { term: 'SAM', def: 'Smart Access Memory - nome AMD para Resizable BAR.', cat: 'GPU' },

    // ==================== MEMÓRIA RAM ====================
    { term: 'DDR4', def: 'Double Data Rate 4 - geração de memória (até ~5000MHz).', cat: 'RAM' },
    { term: 'DDR5', def: 'Double Data Rate 5 - geração atual (5200MHz+).', cat: 'RAM' },
    { term: 'XMP', def: 'Extreme Memory Profile - perfis de OC da Intel.', cat: 'RAM' },
    { term: 'EXPO', def: 'Extended Profiles for Overclocking - perfis AMD.', cat: 'RAM' },
    { term: 'DOCP', def: 'D.O.C.P. - nome ASUS para EXPO.', cat: 'RAM' },
    { term: 'JEDEC', def: 'Especificações padrão de memória (conservadoras).', cat: 'RAM' },
    { term: 'Timings', def: 'Latências em ciclos de clock (CL-tRCD-tRP-tRAS).', cat: 'RAM' },
    { term: 'CAS Latency (CL)', def: 'Ciclos entre comando e dados - timing principal.', cat: 'RAM' },
    { term: 'tRCD', def: 'Row to Column Delay - tempo para aceder a coluna.', cat: 'RAM' },
    { term: 'tRP', def: 'Row Precharge - tempo para preparar nova linha.', cat: 'RAM' },
    { term: 'tRAS', def: 'Row Active Time - tempo mínimo de linha ativa.', cat: 'RAM' },
    { term: 'tRFC', def: 'Refresh Cycle Time - tempo de refresh (impacta muito).', cat: 'RAM' },
    { term: 'tFAW', def: 'Four Activate Window - janela para 4 ativações.', cat: 'RAM' },
    { term: 'tWR', def: 'Write Recovery Time.', cat: 'RAM' },
    { term: 'tRTP', def: 'Read to Precharge.', cat: 'RAM' },
    { term: 'Command Rate', def: '1T ou 2T - ciclos entre comandos consecutivos.', cat: 'RAM' },
    { term: 'Gear Mode', def: 'Ratio entre controlador e RAM (Gear 1 = 1:1).', cat: 'RAM' },
    { term: 'Single Rank (SR)', def: 'Um conjunto de chips por lado do módulo.', cat: 'RAM' },
    { term: 'Dual Rank (DR)', def: 'Dois conjuntos de chips (geralmente melhor).', cat: 'RAM' },
    { term: 'Channel', def: 'Canal de memória - dual channel = 2 canais.', cat: 'RAM' },
    { term: 'DIMM', def: 'Dual In-line Memory Module - módulo físico de RAM.', cat: 'RAM' },
    { term: 'SO-DIMM', def: 'Módulo de RAM para portáteis (mais pequeno).', cat: 'RAM' },
    { term: 'IC / Die', def: 'Chip de memória usado (Samsung B-die, Hynix, etc).', cat: 'RAM' },
    { term: 'Samsung B-die', def: 'IC premium que overclocka muito bem.', cat: 'RAM' },
    { term: 'Hynix CJR/DJR', def: 'ICs Hynix de boa qualidade para OC.', cat: 'RAM' },
    { term: 'Hynix A-die/M-die', def: 'ICs DDR5 com bom potencial de OC.', cat: 'RAM' },
    { term: 'Micron E-die', def: 'IC que escala bem com voltagem.', cat: 'RAM' },
    { term: 'QVL', def: 'Qualified Vendor List - RAMs testadas pelo fabricante da MB.', cat: 'RAM' },
    { term: 'Latency (ns)', def: 'Latência absoluta em nanosegundos.', cat: 'RAM' },
    { term: 'Bandwidth', def: 'Largura de banda em MB/s ou GB/s.', cat: 'RAM' },

    // ==================== MOTHERBOARD / VRM ====================
    { term: 'VRM', def: 'Voltage Regulator Module - converte 12V para voltagens do CPU.', cat: 'Motherboard' },
    { term: 'Phase', def: 'Estágio individual do VRM (mais fases = mais estável).', cat: 'Motherboard' },
    { term: 'Doubler', def: 'Chip que duplica fases virtualmente.', cat: 'Motherboard' },
    { term: 'MOSFET', def: 'Transistor de potência nos VRMs.', cat: 'Motherboard' },
    { term: 'DrMOS', def: 'Driver + MOSFETs integrados num só componente.', cat: 'Motherboard' },
    { term: 'SPS', def: 'Smart Power Stage - DrMOS com monitorização.', cat: 'Motherboard' },
    { term: 'Choke', def: 'Indutor que filtra a corrente.', cat: 'Motherboard' },
    { term: 'Capacitor', def: 'Armazena e filtra energia no VRM.', cat: 'Motherboard' },
    { term: 'VRM Heatsink', def: 'Dissipador sobre os VRMs.', cat: 'Motherboard' },
    { term: 'Chipset', def: 'Chip que gere I/O e conectividade (Z790, X670, etc).', cat: 'Motherboard' },
    { term: 'Socket', def: 'Tipo de encaixe do CPU (LGA1700, AM5, etc).', cat: 'Motherboard' },
    { term: 'BIOS', def: 'Basic Input/Output System - firmware da motherboard.', cat: 'Motherboard' },
    { term: 'UEFI', def: 'Unified Extensible Firmware Interface - BIOS moderno.', cat: 'Motherboard' },
    { term: 'CMOS', def: 'Memória que guarda configurações da BIOS.', cat: 'Motherboard' },
    { term: 'Clear CMOS', def: 'Reset das configurações da BIOS para defaults.', cat: 'Motherboard' },
    { term: 'POST', def: 'Power-On Self Test - teste inicial ao ligar.', cat: 'Motherboard' },
    { term: 'Debug LED', def: 'LEDs ou display que mostram erros de POST.', cat: 'Motherboard' },

    // ==================== ARREFECIMENTO ====================
    { term: 'Air Cooling', def: 'Arrefecimento por ar com ventoinha e dissipador.', cat: 'Arrefecimento' },
    { term: 'Tower Cooler', def: 'Dissipador tipo torre com heatpipes.', cat: 'Arrefecimento' },
    { term: 'AIO', def: 'All-In-One - sistema de água fechado.', cat: 'Arrefecimento' },
    { term: 'Custom Loop', def: 'Sistema de água personalizado com componentes separados.', cat: 'Arrefecimento' },
    { term: 'Radiator', def: 'Dissipador onde a água perde calor para o ar.', cat: 'Arrefecimento' },
    { term: 'Pump', def: 'Bomba que circula o líquido de arrefecimento.', cat: 'Arrefecimento' },
    { term: 'Waterblock', def: 'Bloco que transfere calor do componente para a água.', cat: 'Arrefecimento' },
    { term: 'Heatpipe', def: 'Tubo com fluido que transfere calor rapidamente.', cat: 'Arrefecimento' },
    { term: 'Thermal Paste', def: 'Pasta térmica que preenche espaços microscópicos.', cat: 'Arrefecimento' },
    { term: 'Liquid Metal', def: 'Condutor térmico de metal líquido (muito eficiente, corrosivo).', cat: 'Arrefecimento' },
    { term: 'Fan Curve', def: 'Perfil que define velocidade da ventoinha por temperatura.', cat: 'Arrefecimento' },
    { term: 'PWM', def: 'Pulse Width Modulation - controlo de velocidade de ventoinhas.', cat: 'Arrefecimento' },
    { term: 'RPM', def: 'Rotações Por Minuto - velocidade da ventoinha.', cat: 'Arrefecimento' },
    { term: 'CFM', def: 'Cubic Feet per Minute - fluxo de ar.', cat: 'Arrefecimento' },
    { term: 'Static Pressure', def: 'Capacidade de empurrar ar através de restrições.', cat: 'Arrefecimento' },
    { term: 'Intake', def: 'Entradas de ar fresco no case.', cat: 'Arrefecimento' },
    { term: 'Exhaust', def: 'Saídas de ar quente do case.', cat: 'Arrefecimento' },
    { term: 'Positive Pressure', def: 'Mais intake que exhaust (menos pó).', cat: 'Arrefecimento' },
    { term: 'Negative Pressure', def: 'Mais exhaust que intake.', cat: 'Arrefecimento' },

    // ==================== SOFTWARE & FERRAMENTAS ====================
    { term: 'MSI Afterburner', def: 'Software popular para OC de GPUs.', cat: 'Software' },
    { term: 'RTSS', def: 'RivaTuner Statistics Server - overlay de monitorização.', cat: 'Software' },
    { term: 'HWiNFO64', def: 'Software de monitorização detalhada de hardware.', cat: 'Software' },
    { term: 'CPU-Z', def: 'Utilitário de informação de CPU/RAM.', cat: 'Software' },
    { term: 'GPU-Z', def: 'Utilitário de informação de GPU.', cat: 'Software' },
    { term: 'Ryzen Master', def: 'Software oficial AMD para OC de Ryzen.', cat: 'Software' },
    { term: 'Intel XTU', def: 'Intel Extreme Tuning Utility - OC oficial Intel.', cat: 'Software' },
    { term: 'ThrottleStop', def: 'Software para undervolt/OC de CPUs Intel.', cat: 'Software' },
    { term: 'CoreCycler', def: 'Ferramenta para testar Curve Optimizer por core.', cat: 'Software' },
    { term: 'Prime95', def: 'Stress test extremo de CPU.', cat: 'Software' },
    { term: 'OCCT', def: 'Stress test para CPU, GPU e PSU.', cat: 'Software' },
    { term: 'Cinebench', def: 'Benchmark de CPU baseado em renderização.', cat: 'Software' },
    { term: '3DMark', def: 'Suite de benchmarks para GPU e sistema.', cat: 'Software' },
    { term: 'Unigine Heaven', def: 'Benchmark/stress test gratuito para GPU.', cat: 'Software' },
    { term: 'FurMark', def: 'Stress test térmico extremo para GPU.', cat: 'Software' },
    { term: 'MemTest86', def: 'Teste de estabilidade de RAM (boot USB).', cat: 'Software' },
    { term: 'TestMem5 (TM5)', def: 'Teste de RAM em Windows.', cat: 'Software' },
    { term: 'ANTA Extreme', def: 'Configuração agressiva para TestMem5.', cat: 'Software' },
    { term: 'Karhu RAM Test', def: 'Teste de RAM pago muito eficaz.', cat: 'Software' },
    { term: 'Thaiphoon Burner', def: 'Identifica o IC/die dos módulos de RAM.', cat: 'Software' },
    { term: 'DRAM Calculator', def: 'Calculador de timings de RAM para Ryzen.', cat: 'Software' },

    // ==================== MÉTRICAS & PERFORMANCE ====================
    { term: 'FPS', def: 'Frames Per Second - imagens renderizadas por segundo.', cat: 'Performance' },
    { term: '1% Low', def: 'FPS do percentil 1% mais baixo (indica stuttering).', cat: 'Performance' },
    { term: '0.1% Low', def: 'FPS do percentil 0.1% mais baixo (pior caso).', cat: 'Performance' },
    { term: 'Frame Time', def: 'Tempo para renderizar cada frame (em ms).', cat: 'Performance' },
    { term: 'Stutter', def: 'Engasgos ou pausas na fluidez da imagem.', cat: 'Performance' },
    { term: 'Microstutter', def: 'Pequenas variações de frame time imperceptíveis mas sentidas.', cat: 'Performance' },
    { term: 'Latency', def: 'Tempo de resposta ou atraso em operações.', cat: 'Performance' },
    { term: 'IPC', def: 'Instructions Per Cycle - eficiência por ciclo de clock.', cat: 'Performance' },
    { term: 'Score', def: 'Pontuação de benchmark para comparação.', cat: 'Performance' },
    { term: 'Synthetic', def: 'Benchmark artificial que não representa uso real.', cat: 'Performance' },
    { term: 'Real-world', def: 'Teste em aplicações ou jogos reais.', cat: 'Performance' },
]

// Category stats
const getCategoryStats = () => {
    const stats = {}
    GLOSSARY_DATA.forEach(item => {
        stats[item.cat] = (stats[item.cat] || 0) + 1
    })
    return stats
}

// Get unique categories
const getCategories = () => {
    const cats = [...new Set(GLOSSARY_DATA.map(item => item.cat))]
    return ['Todas', ...cats.sort()]
}

const Glossary = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('Todas')

    const categories = useMemo(() => getCategories(), [])
    const categoryStats = useMemo(() => getCategoryStats(), [])

    const filteredTerms = useMemo(() => {
        return GLOSSARY_DATA.filter(item => {
            const matchesSearch = !search ||
                item.term.toLowerCase().includes(search.toLowerCase()) ||
                item.def.toLowerCase().includes(search.toLowerCase())
            const matchesCategory = category === 'Todas' || item.cat === category
            return matchesSearch && matchesCategory
        }).sort((a, b) => a.term.localeCompare(b.term))
    }, [search, category])

    return (
        <div className="glossary-page">
            {/* Header */}
            <div className="tools-hero">
                <ListIcon />
                <h1 className="page-title">GLOSSÁRIO <span>DE OVERCLOCK</span></h1>
                <p className="page-subtitle">
                    Mais de {GLOSSARY_DATA.length} termos técnicos explicados de forma simples.
                </p>
            </div>

            {/* Search */}
            <div className="glossary-controls">
                <div className="glossary-search">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Pesquisar termos ou definições..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="glossary-search-clear" onClick={() => setSearch('')}>
                            ×
                        </button>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className="glossary-categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`glossary-cat-btn ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                        {cat !== 'Todas' && (
                            <span className="glossary-cat-count">{categoryStats[cat]}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="glossary-count">
                {search || category !== 'Todas' ? (
                    <>A mostrar <span>{filteredTerms.length}</span> de {GLOSSARY_DATA.length} termos</>
                ) : (
                    <><span>{GLOSSARY_DATA.length}</span> termos disponíveis</>
                )}
            </div>

            {/* Terms List */}
            <div className="glossary-list">
                {filteredTerms.map((item, idx) => (
                    <div key={idx} className="glossary-item">
                        <div className="glossary-term">
                            <span className="glossary-term-name">{item.term}</span>
                            <span className="glossary-term-cat">{item.cat}</span>
                        </div>
                        <div className="glossary-def">{item.def}</div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTerms.length === 0 && (
                <div className="glossary-empty">
                    <div className="glossary-empty-title">Nenhum termo encontrado</div>
                    <p>Tenta outra pesquisa ou muda a categoria.</p>
                    <button className="btn btn-secondary" onClick={() => { setSearch(''); setCategory('Todas'); }}>
                        Limpar Filtros
                    </button>
                </div>
            )}
        </div>
    )
}

export default Glossary
