/* ============================================================
   v2-content.js — fonte única de textos da v2.
   Curado a partir de content_lp.json: provas dedupadas,
   KPIs enxutos, copy do "Não" suavizada, ordem ajustada.
   ============================================================ */
window.V2_CONFIG = {
  linkedin_url: "https://www.linkedin.com/in/victor-seliger-208137b6/",
  github_repo_url: "https://github.com/victorseliger/portfolio",
  whatsapp_number: "5511993137446",
  whatsapp_message_pt: "Oi Victor, vi sua página e quero conversar sobre uma oportunidade.",
  whatsapp_message_en: "Hi Victor, I saw your page and would like to talk about an opportunity."
};

window.V2_CONTENT = {
  /* ========================== PORTUGUÊS ========================== */
  pt: {
    meta: {
      title: "Victor Seliger — Senior Implementation & Solutions Engineer · AI-Native Delivery",
      description: "9 anos em mercado financeiro, IA aplicada em produção. Página feita pra você ler em 3 minutos e sair sabendo se vale a conversa."
    },
    topbar: { name: "Victor Seliger", cta_primary: "Perfil", cta_inmail: "InMail", cta_secondary: "WhatsApp", lang_aria: "Trocar idioma" },

    nav: { start: "Início", snapshot: "Resumo", about: "Sobre", traj: "Trajetória", ai: "IA", stack: "Stack", obj: "Objetivo", skin: "Bastidores", contact: "Contato" },

    hero: {
      kicker: "engenharia · dados · ia aplicada",
      name: "Victor Seliger",
      role: "Senior Implementation & Solutions Engineer · AI-Native Delivery",
      promise: "Tech recruiter, você usará apenas 3 minutos nessa página.",
      specs: [
        { l: "Local", v: "São Paulo · Híbrido" },
        { l: "Disponibilidade", v: "A negociar" },
        { l: "Regimes de contrato", v: "PJ · Híbrido ou Remoto · Nacional ou Internacional" },
        { l: "Experiência", v: "Fintechs B2B e SaaS data-driven" }
      ],
      cta_primary: "Chamar no LinkedIn",
      cta_secondary: "Falar no WhatsApp",
      fast_cue: "o resumo de 3 minutos"
    },

    snapshot: {
      label: "Os 3 minutos",
      headline: "<strong>11 anos</strong> no mercado financeiro<span class=\"blink-cursor\" aria-hidden=\"true\">_</span><span class=\"snapshot__headline-2\">Hoje, <strong>implanto fluxos regulados</strong> com <strong>IA aplicada em produção</strong>.</span>",
      sub: "Do <strong>planejamento estratégico</strong> de instituições financeiras <strong>(R$ 2,2 bi/ano)</strong> à <strong>implantação de reconciliações</strong> na Dattos.<br><br>O que une todos os elos: em <strong>100% da carreira</strong> sempre estive na <strong>fronteira entre regras de negócio e os dados</strong>.",
      proofs_label: "Por que vale a conversa",
      proofs: [
        { k: "01", t: "Tradução negócio ↔ arquitetura", d: "Método consultivo de C-level a TI, formado no Itaú e aplicado em cada implantação." },
        { k: "02", t: "IA aplicada em produção real, não em PoC", d: "+400h de experiência produtiva em Claude Code delivery + cursos Anthropic." },
        { k: "03", t: "Implantação regulada ponta-a-ponta", d: "Projetos enterprise na Dattos: variadas automações e conciliações corporate atingindo a dor do cliente." }
      ],
      looking_label: "Procuro",
      roles: ["Senior Solutions Engineer", "Senior Implementation Engineer", "Applied AI / Forward Deployed Engineer"],
      deepen: "Quer se aprofundar? Continua rolando."
    },

    about: {
      section_title: "Sobre mim",
      photo_alt: "Foto de Victor Seliger",
      name: "Victor Seliger",
      where: "{pin} São Paulo <span class=\"about__sep\">·</span> 33 anos",
      family: "Casado, pai do Octávio e do Davi",
      lead: "Trabalhar com tecnologia é <strong>se adaptar rápido aos novos caminhos</strong>.",
      text: "Gestor é quem sabe <strong>implantar tecnologia aplicada à solução de dores do negócio</strong> — por isso atendo desde <strong>demanda de C-level</strong> até <strong>integração com órgão regulatório</strong>.",
      stat: {
        num: "75",
        lead: "do sucesso de uma implantação",
        text: "está no <strong>mapeamento de dor</strong> e na <strong>arquitetura de solução</strong>. É onde reforço minhas skills enquanto estudo a certificação <strong>Anthropic CCA-F</strong>."
      },
      bet: "Aposto que o mercado financeiro brasileiro vai <strong>mudar mais nos próximos 5 anos do que mudou nos últimos 30</strong>. Quero estar na ponta, construindo com <strong>IA aplicada em produção</strong>.",
      meta: [
        { l: "Modelo", v: "PJ · Híbrido SP, remoto Brasil ou exterior" },
        { l: "Disponibilidade", v: "A negociar" },
        { l: "Idiomas", v: "Português (nativo) · Inglês (avançado) · Espanhol (intermediário)" }
      ]
    },

    trajectory: {
      section_title: "Trajetória",
      hint: "Uma linha do tempo — do mais recente ao primeiro cargo.",
      aside_label: "Projeto paralelo (Internacional)",
      entries: [
        {
          company: "Dattos", accent: "#3b6df0", logo: "assets/logo-dattos.svg",
          period: "Out 2025 — Atual",
          roles: [
            {
              title: "Senior Implementation Analyst — Data & AI Automation",
              manifesto: "Conduzo a implantação ponta a ponta de conciliação financeira regulada para áreas financeiras e contábeis de clientes enterprise (automotivo, financeiro, energia, logística), com foco em instituições financeiras — unindo automação, governança e gestão consultiva à operação de conciliação.",
              bullets: [
                "Levantamento de requisitos, mapeamento de processos e modelagem em formatos regulatórios BACEN (CADOC 3040/3044), parsing Swift MT940 e conciliação automatizada de vendas e recebimentos multi-adquirente.",
                "Liderança da frente data-driven: pipeline ETL ClickUp → n8n → Postgres com dashboard executivo de DRE por diretoria.",
                "Referência interna em IA aplicada em produção (Claude Code) e gestão consultiva das áreas financeira, contábil e de TI dos clientes."
              ]
            }
          ],
          stack: "SQL · Postgres · DuckDB · Python · n8n · Claude Code · AWS · MT940 · BACEN"
        },
        {
          company: "Itaú · Corretora de Seguros", accent: "#EC7000", logo: "assets/logo-itau.svg",
          period: "Jun 2019 — Set 2025",
          roles: [
            {
              title: "Senior Data Analyst",
              period: "Out 2021 — Set 2025",
              manifesto: "Disseminei cultura data-driven em um negócio de R$ 2 bi/ano, conectando demandas comerciais e estratégicas à arquitetura técnica de dados.",
              bullets: [
                "Atendi CRM, estratégia de agências, vendas e fechamentos — entendendo o conceito de negócio antes de implementar a solução técnica.",
                "Liderei programa de capacitação em AWS, impactando mais de 400 profissionais de negócio na diretoria.",
                "Acompanhei alunos do programa de capacitação em dados na execução de projetos reais, que entraram em produção e geraram valor direto para o negócio, aproveitando os data lakes disponibilizados à estrutura administrativa."
              ],
              aside: {
                company: "Vantis Software", logo: "assets/logo-vantis.svg", location: "Portugal (PT)",
                period: "Dez 2021 — Out 2022",
                title: "Senior SAS Consultant (projeto)",
                manifesto: "Atuei na implementação do indicador contábil IFRS 17 em seguradoras como Ageas e Fidelidade.",
                bullets: [
                  "Desenvolvi queries em ambiente SAS para validar e implantar fluxos de dados produtivos com confiabilidade e padronização de processos."
                ],
                stack: "SQL · SAS · ETL"
              }
            },
            {
              title: "Pl. Data Analyst",
              period: "Jun 2019 — Set 2021",
              manifesto: "Planejamento estratégico: orçamento anual, acompanhamento de metas e painéis executivos para a diretoria.",
              bullets: [
                "Orçamento anual alinhado ao comitê executivo, com mensagens-chave para acionistas.",
                "Plano de reversão de metas com atuação direta junto às lideranças comerciais.",
                "Participei da criação do Data Lake de Seguros voltado ao self-service de dados para toda a estrutura administrativa."
              ]
            }
          ],
          stack: "SQL · AWS Athena/S3/QuickSight · Python · SAS · Alteryx · Hadoop · Tableau"
        },
        {
          company: "Itaú · Seguros", accent: "#EC7000", logo: "assets/logo-itau.svg",
          period: "Out 2016 — Jun 2019",
          roles: [
            {
              title: "Jr. Business Planning Analyst",
              manifesto: "Atendi toda a estrutura da seguradora — CRM, estratégia comercial, financeiro, contábil, atuarial e regulatório — transformando dados brutos em informação relevante e entendendo o conceito antes de implementar.",
              bullets: [
                "Mais de 350 demandas de tipos variados atendidas e desenhadas individualmente."
              ]
            }
          ],
          stack: "SQL · SAS · Alteryx · Hadoop · ETL · SUSEP · CRM · Estratégia comercial"
        },
        {
          company: "Câmbio Corporate & CIB", accent: "#c8ccd8", logo: "assets/logo-itau-bba.png", variant: "bba",
          period: "Fev 2015 — Out 2016",
          roles: [
            {
              title: "Middle Officer — Itaú BBA",
              manifesto: "Operações de câmbio para clientes Corporate e CIB — onde aprendi que uma operação manualizada é uma operação improdutiva.",
              bullets: [
                "Compra, venda, exportação, importação, ACC, ACE e TRAVA.",
                "Iniciei meu aprendizado em VBA e apliquei automações de envio de e-mail para baixa de pendências documentais de clientes corporate."
              ]
            }
          ],
          stack: "VBA · Câmbio Corporate"
        }
      ]
    },

    ai: {
      section_title: "Como me destaco com IA",
      manifesto: "Não uso IA como ferramenta. Opero como sistema.",
      bullets: [
        { label: "Pipelines de implementação 3–5x mais rápidos", text: "com Claude Code: modelagem ETL, testes de regressão, documentação técnica e parsing regulatório." },
        { label: "Agentes n8n + Claude para tarefas recorrentes", text: "validação BACEN, geração de relatórios executivos e monitoramento automatizado de pipelines." },
        { label: "Stack viva, em produção", text: "Claude Code · Anthropic API · n8n self-hosted · MCP servers · Postgres." }
      ],
      kpi_label: "Em números",
      kpis: [
        { value: "450h+", label: "6 meses de Claude Code em produção real — não em PoC" },
        { value: "15", label: "agentes Claude + n8n orquestrados em produção" },
        { value: "3–5×", label: "pipelines de implementação mais rápidos" }
      ],
      proof_label: "Prova viva",
      proof_text: "Esta página foi construída com Claude Code — em horas, não semanas. Você está dentro da prova agora."
    },

    stack: {
      section_title: "Stack técnica e soft skills",
      hint: "Clique pra abrir cada frente.",
      categories: [
        {
          name: "Soft Skills",
          tech: "Tradução técnico-negócio · Gestão de stakeholders · Capacitação técnica · Storytelling com dados · Método consultivo",
          value: [
            "Tradução técnico-negócio → o mesmo método consultivo aplicado em projetos para empresas corporate de todos os segmentos e contextos, com resultados reais.",
            "Gestão de stakeholders → de C-level a TI; áreas financeira, contábil, comercial e regulatória, usando dashboards e ferramentas como Jira e ClickUp.",
            "Storytelling com dados → painéis para C-level, comitê executivo e acionistas."
          ],
          case: "“O cliente pede o sintoma, não o que precisa.” Aprendi no Itaú desde 2016, aplico e refino o mesmo método até hoje em cada implantação Dattos."
        },
        {
          name: "IA Aplicada",
          tech: "Claude Code · Anthropic API · n8n · LLM em Produção · MCP Servers · AI Agents",
          value: [
            "Claude Code → 6+ meses em produção, agentes de validação BACEN ativos.",
            "n8n self-hosted → pipeline ETL ClickUp → Postgres, fonte de verdade da liderança Dattos.",
            "Anthropic API → 15 agentes orquestrados em produção."
          ],
          case: "Dashboard executivo de DRE da Dattos — fora do escopo original, hoje usado pela diretoria como source of truth."
        },
        {
          name: "Dados & Engenharia",
          tech: "SQL · Postgres · DuckDB · ETL · Python · Tableau · Alteryx · SAS · Hadoop · Data Modeling",
          value: [
            "Tableau e QuickSight → painéis executivos Itaú Seguros (diretoria + acionistas).",
            "SQL → centenas de projetos atrelados a automação com dados via SQL.",
            "Python → automações de delivery e validação regulatória."
          ],
          case: "Análises estratégicas nos canais e produtos de seguros na Itaú Corretora que viram planos de ação executivo com otimização e recuperação de receita."
        },
        {
          name: "Cloud",
          tech: "AWS Athena · S3 · QuickSight · EventBridge · n8n self-hosted · Postgres",
          value: [
            "AWS Athena/S3/QuickSight → infraestrutura de dados Itaú Seguros.",
            "AWS EventBridge → triggers de pipelines em produção.",
            "n8n self-hosted → orquestração de agentes IA em VM dedicada."
          ],
          case: "Programa de capacitação em AWS no Itaú: de zero técnico a autonomia plena para 400+ profissionais de negócio."
        },
        {
          name: "Regulatório, Auditorias e Reports a Acionistas",
          tech: "BACEN · CADOC 3040/3044 · INAD · SUSEP · Multi-adquirentes (Pagar.me, Cielo, PayPal) · IFRS 16 · IFRS 17 · Conciliação bancária e contábil",
          value: [
            "BACEN: CADOC/INAD → implementação completa em ambiente Dattos.",
            "Relatório Swift MT940 → parsing customizado pra clientes enterprise.",
            "Conciliação de vendas e pagamentos multi-adquirente → integrações Pagar.me, Cielo (EDI), PayPal (SFTP).",
            "Mais dezenas de outros cases voltados a regulatório, resposta a pontos de auditoria e report a acionistas."
          ],
          case: "Parsing MT940 + validação BACEN em ambiente regulado, ponta-a-ponta, para cliente automotivo enterprise."
        }
      ]
    },

    objective: {
      section_title: "Objetivo de carreira",
      intro: "Próxima transição. Estou aberto a 3 vertentes:",
      vertices: [
        {
          title: "Senior Solutions Engineer",
          fit_label: "Fit técnico",
          fit: [
            "9 anos traduzindo regra de negócio em arquitetura de dados.",
            "Domínio de stakeholders de C-level a TI (Itaú → Dattos).",
            "Stack: SQL, Python, n8n, Claude Code, AWS; integrações multi-adquirente e BACEN."
          ],
          app_label: "Onde aplico em scale-ups",
          app: ["Discovery técnico de clientes enterprise.", "Design de soluções customizadas com IA aplicada.", "Tradução entre engineering, sales e cliente."]
        },
        {
          title: "Senior Implementation Engineer",
          fit_label: "Fit técnico",
          fit: [
            "Implantação ponta-a-ponta na Dattos (clientes enterprise).",
            "Modelagem de dados em formatos regulatórios complexos.",
            "Liderança da frente data-driven (pipeline ETL de DRE)."
          ],
          app_label: "Onde aplico em scale-ups",
          app: ["Onboarding técnico de contas estratégicas.", "Configuração de produto + customização enterprise.", "Reduzir time-to-value via IA aplicada no delivery."]
        },
        {
          title: "Applied AI / Forward Deployed Engineer",
          fit_label: "Fit técnico",
          fit: [
            "Referência interna em IA aplicada (Claude Code + n8n).",
            "6+ meses de LLM em produção real, não em PoC.",
            "Background financeiro denso — raro no perfil de FDE no Brasil."
          ],
          app_label: "Onde aplico em scale-ups",
          app: ["Construção de agentes/pipelines com LLM para o cliente final.", "Resolução de problemas técnicos no campo.", "Ponte entre time interno e capacidade real de IA aplicada."]
        }
      ]
    },

    skin: {
      section_title: "Você sabia?",
      intro: "Fiz esta página aplicando, neste momento, o mesmo método de implantação que entrego no trabalho — agora com foco no Tech Recruiter.",
      phases_label: "E as fases foram:",
      research_label: "1. Fase de pesquisa",
      qa: [
        { q: "O que me conecta ao recrutador?", a: "O motor de IA do LinkedIn conecta recrutador e candidato por cargo, skills e palavras-chave." },
        { q: "O que o recrutador precisa saber?", a: "Cargo e skills à primeira vista, e um resumo que gere conexão — antes de qualquer detalhe técnico." },
        { q: "Quanto tempo ele leva pra tomar uma decisão?", a: "A lei dos 6 segundos — o tempo médio de decisão na triagem inicial." },
        { q: "Quanto tempo, no máximo, ele leva pra avaliar um perfil?", a: "Até 3 minutos é o tempo máximo de avaliação completa de um perfil." }
      ],
      architecture_label: "Arquitetura desenvolvida:",
      architecture: [
        { weight: "40%", text: "Palavras-chave conectam a busca e as IAs ao meu perfil no LinkedIn — fazem ele aparecer nas vagas mais relevantes pra mim." },
        { weight: "40%", text: "Cargo e skills à primeira vista — a primeira impressão." },
        { weight: "20%", text: "Perfil resumido — cria conexão e o gatilho de curiosidade." },
        { weight: "+", text: "Link desta página, com a experiência completa." },
        { weight: "+", text: "Observability — o tráfego no meu LinkedIn e nesta página vira dado estratégico para decisões futuras." }
      ],
      stat_value: "3 min",
      stat_label: "<strong>90%</strong> dos tech recruiters levam no <strong>máximo 3 minutos</strong> para ler um perfil por completo."
    },

    final: {
      p1: "Esta página existe porque eu estudei como você trabalha.",
      p2: "LinkedIn Recruiter, Hiring Assistant, mensagens com IA — 3 minutos por candidato qualificado. Tentei caber neles.",
      fit_question: "Tech Recruiter, estou alinhado com o perfil que está buscando",
      yes_label: "Sim",
      no_label: "Ainda não",
      yes_response: "Ótimo, então a triagem já está feita. O próximo passo é você me apresentar a oportunidade pra alinharmos um bate-papo. Clique abaixo:",
      no_response: "Sem problema. Se fizer sentido, vamos manter contato no LinkedIn — perfis variados sempre ajudam quando a vaga certa aparecer.",
      linkedin_label: "Perfil",
      inmail_label: "InMail",
      linkedin_sub: "InMail ou conexão",
      whatsapp_label: "Falar no WhatsApp",
      whatsapp_sub: "resposta direta e rápida",
      connect_label: "Conectar no LinkedIn",
      photo_alt: "Foto de Victor Seliger"
    },

    footer: {
      credits: "Victor Seliger · 2026 · construído com Claude Code",
      repo: "Projetos públicos no GitHub",
      site: "victorseliger.github.io"
    }
  },

  /* ============================== ENGLISH ============================== */
  en: {
    meta: {
      title: "Victor Seliger — Senior Implementation & Solutions Engineer · AI-Native Delivery",
      description: "9 years in financial markets, applied AI in production. A page built to read in 3 minutes and leave knowing if it's worth the conversation."
    },
    topbar: { name: "Victor Seliger", cta_primary: "Profile", cta_inmail: "InMail", cta_secondary: "WhatsApp", lang_aria: "Switch language" },

    nav: { start: "Start", snapshot: "Snapshot", about: "About", traj: "Trajectory", ai: "AI", stack: "Stack", obj: "Goal", skin: "Behind", contact: "Contact" },

    hero: {
      kicker: "engineering · data · applied ai",
      name: "Victor Seliger",
      role: "Senior Implementation & Solutions Engineer · AI-Native Delivery",
      promise: "Tech recruiter, you'll spend just 3 minutes on this page.",
      specs: [
        { l: "Location", v: "São Paulo · Hybrid" },
        { l: "Availability", v: "To be negotiated" },
        { l: "Contract", v: "Contractor (PJ) · Hybrid or Remote · National or International" },
        { l: "Experience", v: "B2B fintech and data-driven SaaS" }
      ],
      cta_primary: "Reach out on LinkedIn",
      cta_secondary: "Message on WhatsApp",
      fast_cue: "the 3-minute snapshot"
    },

    snapshot: {
      label: "The 3 minutes",
      headline: "<strong>11 years</strong> in financial markets<span class=\"blink-cursor\" aria-hidden=\"true\">_</span><span class=\"snapshot__headline-2\">Today I <strong>deploy regulated flows</strong> with <strong>applied AI in production</strong>.</span>",
      sub: "From the <strong>strategic planning</strong> of financial institutions <strong>(R$ 2.2 bn/year)</strong> to <strong>deploying reconciliations</strong> at Dattos.<br><br>What ties every link together: across <strong>100% of my career</strong> I've stood on the <strong>boundary between business rules and data</strong>.",
      proofs_label: "Why it's worth the conversation",
      proofs: [
        { k: "01", t: "Business ↔ architecture translation", d: "Consultative method from C-level to IT, forged at Itaú and applied in every rollout." },
        { k: "02", t: "Applied AI in real production, not in PoC", d: "400+ hours of productive experience in Claude Code delivery + Anthropic courses." },
        { k: "03", t: "End-to-end regulated implementation", d: "Enterprise projects at Dattos: varied automations and corporate reconciliations that hit the client's real pain." }
      ],
      looking_label: "Looking for",
      roles: ["Senior Solutions Engineer", "Senior Implementation Engineer", "Applied AI / Forward Deployed Engineer"],
      deepen: "Want to go deeper? Keep scrolling."
    },

    about: {
      section_title: "About me",
      photo_alt: "Photo of Victor Seliger",
      name: "Victor Seliger",
      where: "{pin} São Paulo <span class=\"about__sep\">·</span> 33 years old",
      family: "Married, father of Octávio and Davi",
      lead: "Working in technology means <strong>adapting fast to new paths</strong>.",
      text: "A leader is someone who can <strong>deploy technology applied to solving real business pain</strong> — which is why I serve everything from <strong>C-level demands</strong> to <strong>regulatory integrations</strong>.",
      stat: {
        num: "75",
        lead: "of a successful implementation",
        text: "lives in <strong>pain mapping</strong> and <strong>solution architecture</strong>. That's where I sharpen my skills while studying for the <strong>Anthropic CCA-F</strong>."
      },
      bet: "I bet the Brazilian financial market will <strong>change more in the next 5 years than it did in the last 30</strong>. I want to be at the leading edge, building with <strong>applied AI in production</strong>.",
      meta: [
        { l: "Model", v: "Contractor (PJ) · Hybrid in SP, remote Brazil or international" },
        { l: "Availability", v: "To be negotiated" },
        { l: "Languages", v: "Portuguese (native) · English (advanced) · Spanish (intermediate)" }
      ]
    },

    trajectory: {
      section_title: "Trajectory",
      hint: "A timeline — from the most recent to the first role.",
      aside_label: "Parallel project (International)",
      entries: [
        {
          company: "Dattos", accent: "#3b6df0", logo: "assets/logo-dattos.svg",
          period: "Oct 2025 — Present",
          roles: [
            {
              title: "Senior Implementation Analyst — Data & AI Automation",
              manifesto: "I lead the end-to-end implementation of regulated financial reconciliation for the finance and accounting teams of enterprise clients (automotive, financial, energy, logistics), with a focus on financial institutions — uniting automation, governance and consultative management with the reconciliation operation.",
              bullets: [
                "Requirements gathering, process mapping and modeling in BACEN regulatory formats (CADOC 3040/3044), Swift MT940 parsing and automated reconciliation of multi-acquirer sales and receipts.",
                "Leading the data-driven front: ClickUp → n8n → Postgres ETL pipeline with an executive P&L dashboard by business unit.",
                "Internal reference in applied AI in production (Claude Code) and consultative management of clients' finance, accounting and IT teams."
              ]
            }
          ],
          stack: "SQL · Postgres · DuckDB · Python · n8n · Claude Code · AWS · MT940 · BACEN"
        },
        {
          company: "Itaú · Insurance Brokerage", accent: "#EC7000", logo: "assets/logo-itau.svg",
          period: "Jun 2019 — Sep 2025",
          roles: [
            {
              title: "Senior Data Analyst",
              period: "Oct 2021 — Sep 2025",
              manifesto: "I spread a data-driven culture across a R$ 2 bn/year business, connecting commercial and strategic demands to the technical data architecture.",
              bullets: [
                "Served CRM, branch strategy, sales and financial closings — understanding the business concept before implementing the technical solution.",
                "Led an AWS training program, impacting more than 400 business professionals across the division.",
                "Mentored students of the data training program in executing real projects that went into production and generated direct business value, leveraging the data lakes made available to the administrative structure."
              ],
              aside: {
                company: "Vantis Software", logo: "assets/logo-vantis.svg", location: "Portugal (PT)",
                period: "Dec 2021 — Oct 2022",
                title: "Senior SAS Consultant (project)",
                manifesto: "Worked on implementing the IFRS 17 accounting indicator at insurers such as Ageas and Fidelidade.",
                bullets: [
                  "Developed queries in a SAS environment to validate and deploy productive data flows with reliability and process standardization."
                ],
                stack: "SQL · SAS · ETL"
              }
            },
            {
              title: "Pl. Data Analyst",
              period: "Jun 2019 — Sep 2021",
              manifesto: "Strategic planning: annual budget, target tracking and executive dashboards for leadership.",
              bullets: [
                "Annual budget aligned with the executive committee, with key messages for shareholders.",
                "Target recovery plan with direct engagement alongside commercial leaders.",
                "Took part in creating the Insurance Data Lake aimed at self-service data for the entire administrative structure."
              ]
            }
          ],
          stack: "SQL · AWS Athena/S3/QuickSight · Python · SAS · Alteryx · Hadoop · Tableau"
        },
        {
          company: "Itaú · Seguros", accent: "#EC7000", logo: "assets/logo-itau.svg",
          period: "Oct 2016 — Jun 2019",
          roles: [
            {
              title: "Jr. Business Planning Analyst",
              manifesto: "Served the entire insurer structure — CRM, commercial strategy, finance, accounting, actuarial and regulatory — turning raw data into relevant information and understanding the concept before implementing.",
              bullets: [
                "More than 350 varied demands handled and designed individually."
              ]
            }
          ],
          stack: "SQL · SAS · Alteryx · Hadoop · ETL · SUSEP · CRM · Commercial strategy"
        },
        {
          company: "Corporate FX & CIB", accent: "#c8ccd8", logo: "assets/logo-itau-bba.png", variant: "bba",
          period: "Feb 2015 — Oct 2016",
          roles: [
            {
              title: "Middle Officer — Itaú BBA",
              manifesto: "FX operations for Corporate and CIB clients — where I learned that a manual operation is an unproductive operation.",
              bullets: [
                "Buy, sell, export, import, ACC, ACE and TRAVA operations.",
                "Began learning VBA and applied email-automation to clear corporate clients' documentary pending items."
              ]
            }
          ],
          stack: "VBA · Corporate FX"
        }
      ]
    },

    ai: {
      section_title: "How I stand out with AI",
      manifesto: "I don't use AI as a tool. I operate as a system.",
      bullets: [
        { label: "Implementation pipelines 3–5x faster", text: "with Claude Code: ETL modeling, regression testing, technical documentation and regulatory parsing." },
        { label: "n8n + Claude agents for recurring tasks", text: "BACEN validation, executive report generation and automated pipeline monitoring." },
        { label: "A live stack, in production", text: "Claude Code · Anthropic API · n8n self-hosted · MCP servers · Postgres." }
      ],
      kpi_label: "In numbers",
      kpis: [
        { value: "450h+", label: "6 months of Claude Code in real production — not in PoC" },
        { value: "15", label: "Claude + n8n agents orchestrated in production" },
        { value: "3–5×", label: "faster implementation pipelines" }
      ],
      proof_label: "Living proof",
      proof_text: "This page was built with Claude Code — in hours, not weeks. You're inside the proof right now."
    },

    stack: {
      section_title: "Tech stack and soft skills",
      hint: "Click to open each area.",
      categories: [
        {
          name: "Soft Skills",
          tech: "Business-to-technical translation · Stakeholder management · Technical enablement · Storytelling with data · Consultative method",
          value: [
            "Business-to-technical translation → the same consultative method applied to projects for corporate companies across every segment and context, with real results.",
            "Stakeholder management → C-level to IT; finance, accounting, commercial and regulatory teams, using dashboards and tools like Jira and ClickUp.",
            "Storytelling with data → dashboards for C-level, executive committee and shareholders."
          ],
          case: "“The client asks for the symptom, not what they need.” Learned at Itaú since 2016 — I apply and refine the same method to this day in every Dattos rollout."
        },
        {
          name: "Applied AI",
          tech: "Claude Code · Anthropic API · n8n · LLM in Production · MCP Servers · AI Agents",
          value: [
            "Claude Code → 6+ months in production, active BACEN validation agents.",
            "n8n self-hosted → ClickUp → Postgres ETL pipeline, Dattos leadership's source of truth.",
            "Anthropic API → 15 orchestrated agents in production."
          ],
          case: "Dattos executive P&L dashboard — outside the original scope, today used by leadership as the source of truth."
        },
        {
          name: "Data & Engineering",
          tech: "SQL · Postgres · DuckDB · ETL · Python · Tableau · Alteryx · SAS · Hadoop · Data Modeling",
          value: [
            "Tableau and QuickSight → executive dashboards at Itaú Seguros (leadership + shareholders).",
            "SQL → hundreds of projects tied to data automation via SQL.",
            "Python → delivery automation and regulatory validation."
          ],
          case: "Strategic analyses across insurance channels and products at Itaú Brokerage that turned into executive action plans with revenue optimization and recovery."
        },
        {
          name: "Cloud",
          tech: "AWS Athena · S3 · QuickSight · EventBridge · n8n self-hosted · Postgres",
          value: [
            "AWS Athena/S3/QuickSight → Itaú Seguros data infrastructure.",
            "AWS EventBridge → production pipeline triggers.",
            "n8n self-hosted → AI agent orchestration on a dedicated VM."
          ],
          case: "AWS training program at Itaú: from zero technical background to full autonomy for 400+ business professionals."
        },
        {
          name: "Regulatory, Audits & Shareholder Reporting",
          tech: "BACEN · CADOC 3040/3044 · INAD · SUSEP · Multi-acquirer (Pagar.me, Cielo, PayPal) · IFRS 16 · IFRS 17 · Bank & accounting reconciliation",
          value: [
            "BACEN: CADOC/INAD → full implementation in the Dattos environment.",
            "Swift MT940 report → custom parsing for enterprise clients.",
            "Multi-acquirer sales & payment reconciliation → Pagar.me, Cielo (EDI), PayPal (SFTP) integrations.",
            "Plus dozens of other cases focused on regulatory work, audit-point responses and shareholder reporting."
          ],
          case: "End-to-end MT940 parsing + BACEN validation in a regulated environment for an enterprise automotive client."
        }
      ]
    },

    objective: {
      section_title: "Career goal",
      intro: "Next transition. Open to 3 paths:",
      vertices: [
        {
          title: "Senior Solutions Engineer",
          fit_label: "Technical fit",
          fit: [
            "9 years translating business rules into data architecture.",
            "Command of stakeholders from C-level to IT (Itaú → Dattos).",
            "Stack: SQL, Python, n8n, Claude Code, AWS; multi-acquirer and BACEN integrations."
          ],
          app_label: "Where I apply it in scale-ups",
          app: ["Technical discovery of enterprise clients.", "Designing custom solutions with applied AI.", "Translation between engineering, sales and the client."]
        },
        {
          title: "Senior Implementation Engineer",
          fit_label: "Technical fit",
          fit: [
            "End-to-end implementation at Dattos (enterprise clients).",
            "Data modeling in complex regulatory formats.",
            "Leadership of the data-driven front (P&L ETL pipeline)."
          ],
          app_label: "Where I apply it in scale-ups",
          app: ["Technical onboarding of strategic accounts.", "Product configuration + enterprise customization.", "Reducing time-to-value via applied AI in delivery."]
        },
        {
          title: "Applied AI / Forward Deployed Engineer",
          fit_label: "Technical fit",
          fit: [
            "Internal reference in applied AI (Claude Code + n8n).",
            "6+ months of LLM in real production, not in PoC.",
            "Dense financial background — rare in the BR FDE profile."
          ],
          app_label: "Where I apply it in scale-ups",
          app: ["Building LLM agents/pipelines for the end client.", "Solving technical problems in the field.", "Bridge between the internal team and real applied-AI capability."]
        }
      ]
    },

    skin: {
      section_title: "Did you know?",
      intro: "I built this page applying — right now — the same implementation method I deliver at work, this time focused on the Tech Recruiter.",
      phases_label: "And the phases were:",
      research_label: "1. Research phase",
      qa: [
        { q: "What connects me to the recruiter?", a: "LinkedIn's AI engine matches recruiter and candidate by role, skills and keywords." },
        { q: "What does the recruiter need to know?", a: "Role and skills at a glance, and a summary that builds connection — before any technical detail." },
        { q: "How long do they take to make a decision?", a: "The 6-second rule — the average decision time in the initial screening." },
        { q: "At most, how long do they take to evaluate a profile?", a: "Up to 3 minutes is the maximum time for a full profile evaluation." }
      ],
      architecture_label: "Architecture I built:",
      architecture: [
        { weight: "40%", text: "Keywords connect search and AIs to my LinkedIn profile — making it surface in the roles most relevant to me." },
        { weight: "40%", text: "Role and skills at a glance — the first impression." },
        { weight: "20%", text: "A tight profile summary — builds connection and the curiosity trigger." },
        { weight: "+", text: "A link to this page, with the full experience." },
        { weight: "+", text: "Observability — traffic on my LinkedIn and this page becomes strategic data for future decisions." }
      ],
      stat_value: "3 min",
      stat_label: "<strong>90%</strong> of tech recruiters spend <strong>at most 3 minutes</strong> reading a profile in full."
    },

    final: {
      p1: "This page exists because I studied how you work.",
      p2: "LinkedIn Recruiter, Hiring Assistant, AI-assisted messages — 3 minutes per qualified candidate. I tried to fit in them.",
      fit_question: "Tech recruiter, am I aligned with the profile you're looking for",
      yes_label: "Yes",
      no_label: "Not yet",
      yes_response: "Great, the screening is already done. The next step is for you to tell me about the opportunity so we can line up a chat. Click below:",
      no_response: "No problem. If it makes sense, let's stay in touch on LinkedIn — varied profiles always help when the right role shows up.",
      linkedin_label: "Profile",
      inmail_label: "InMail",
      linkedin_sub: "InMail or connection",
      whatsapp_label: "Message on WhatsApp",
      whatsapp_sub: "direct, fast reply",
      connect_label: "Connect on LinkedIn",
      photo_alt: "Photo of Victor Seliger"
    },

    footer: {
      credits: "Victor Seliger · 2026 · built with Claude Code",
      repo: "Public projects on GitHub",
      site: "victorseliger.github.io"
    }
  }
};
