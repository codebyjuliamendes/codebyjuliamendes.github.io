/* EN <-> PT toggle. English is the source text in the HTML; Portuguese lives here.
   Each key is a text node exactly as it appears in the HTML (trimmed). */
(function () {
  var PT = {
    /* Shared */
    "Skip to content": "Pular para o conteúdo",
    "Work": "Projetos", "Experience": "Experiência", "Contact": "Contato", "Work with me": "Trabalhe comigo",
    "← All work": "← Todos os projetos",
    "© 2026 Júlia Mendes · São Luís, Brazil": "© 2026 Júlia Mendes · São Luís, Brasil",
    "Designed in Figma · Shipped on GitHub Pages": "Desenhado no Figma · Publicado no GitHub Pages",
    "View the code →": "Ver o código →", "Next case study": "Próximo estudo de caso",
    "My role": "Meu papel", "Team": "Equipe", "Timeline": "Prazo", "Stack": "Stack", "Status": "Status",
    "01 — Problem": "01 — Problema",
    "03 — Decisions & trade-offs": "03 — Decisões e trade-offs", "Why it was built this way.": "Por que foi construído assim.",
    "04 — What I’d do next": "04 — O que eu faria a seguir",
    "What the next version needs.": "O que a próxima versão precisa.",
    "The product": "O produto",

    /* Home: hero and highlights */
    "Open to GenAI internships · Feb 2027": "Aberta a estágios em GenAI · Fev 2027",
    "I build generative AI that goes": "Eu construo IA generativa que vai",
    "beyond the demo.": "além da demo.",
    "AI developer intern at Mercado Eletrônico and AI researcher at UFMA. I turn LLMs into products people can trust: semantic search, agents, guardrails and evaluation.": "Estagiária de desenvolvimento de IA no Mercado Eletrônico e pesquisadora de IA na UFMA. Transformo LLMs em produtos em que as pessoas podem confiar: busca semântica, agentes, guardrails e avaliação.",
    "View case studies →": "Ver estudos de caso →", "Email me": "Me envie um e-mail",
    "São Luís, Brazil · Computer Science @ UFMA · Google Student Ambassador": "São Luís, Brasil · Ciência da Computação @ UFMA · Embaixadora Estudantil do Google",
    "3rd": "3º", "Hackathon Equatorial · EQT Lab": "Hackathon Equatorial · EQT Lab",
    "Hackathon da Transparência": "Hackathon da Transparência",
    "Paper": "Artigo", "Accepted · I Simpósio em Saúde Biopsicossocial": "Aceito · I Simpósio em Saúde Biopsicossocial",
    "Student Ambassador · 2026": "Embaixadora Estudantil · 2026",

    /* Home: experience */
    "01 — Experience": "01 — Experiência", "Where I’ve built.": "Onde eu construí.",
    "May 2026 — Now": "Mai 2026 — Atual", "2026 — Now": "2026 — Atual", "Sep 2025 — May 2026": "Set 2025 — Mai 2026",
    "AI Developer Intern": "Estagiária em Desenvolvimento de IA",
    "Building an AI-driven data-cleansing engine where LLMs run taxonomy, deduplication and Golden Record creation, plus agents and MCP-based apps for internal teams.": "Construo um motor de saneamento de dados em que LLMs fazem taxonomia, deduplicação e criação de Golden Record, além de agentes e apps com MCP para times internos.",
    "AI Research Student": "Pesquisadora de IA (iniciação científica)",
    "An AI system that maps bodily injuries on a body diagram and translates forensic reports into plain language. Paper accepted at the I Symposium on Biopsychosocial Health.": "Um sistema de IA que mapeia lesões corporais em um croqui e traduz laudos periciais para linguagem simples. Trabalho aceito no I Simpósio em Saúde Biopsicossocial.",
    "Applied AI": "IA aplicada", "Research": "Pesquisa",
    "GenAI Instructor": "Instrutora de GenAI",
    "Ran a three-workshop Claude program for a law firm and built Secretária IA, a WhatsApp agent for appointment-based businesses.": "Conduzi um programa de três oficinas de Claude para um escritório de advocacia e criei a Secretária IA, um agente de WhatsApp para negócios de agendamento.",
    "Agents": "Agentes", "Training": "Treinamentos",
    "IT Intern": "Estagiária de TI", "Ministry of Health": "Ministério da Saúde",
    "Automated repetitive workflows with Python (pandas, Selenium) and n8n, and cleaned data to support decisions.": "Automatizei fluxos repetitivos com Python (pandas, Selenium) e n8n e tratei dados para apoiar decisões.",

    /* Home: selected work */
    "02 — Selected work": "02 — Projetos selecionados", "Case studies, not screenshots.": "Estudos de caso, não só prints.",
    "All projects on GitHub →": "Todos os projetos no GitHub →",
    "“Who can help me evaluate a RAG pipeline?”": "“Quem pode me ajudar a avaliar um pipeline de RAG?”",
    "Best match": "Melhor conexão", "Match 2": "Conexão 2", "Match 3": "Conexão 3",
    "AI · 3rd place · Hackathon Equatorial": "IA · 3º lugar · Hackathon Equatorial",
    "Entre Elas: an AI curator that matches colleagues by meaning": "Entre Elas: uma curadoria de IA que conecta colegas pelo significado",
    "Free-text request → semantic search → ranked matches, each explained with real profile evidence. Schema-validated JSON and a Gemini → Groq fallback.": "Pedido em texto livre → busca semântica → conexões ranqueadas, cada uma explicada com evidências reais do perfil. JSON validado por schema e fallback Gemini → Groq.",
    "Read case study →": "Ler estudo de caso →",
    "School meals spending, 2025": "Gastos com merenda escolar, 2025",
    "AI · 3rd place · Hackathon da Transparência": "IA · 3º lugar · Hackathon da Transparência",
    "Transparência MA: public spending, explained": "Transparência MA: o gasto público, explicado",
    "Semantic search and voice accessibility over open government data, answering citizens in plain language.": "Busca semântica e acessibilidade por voz sobre dados abertos do governo, respondendo ao cidadão em linguagem simples.",
    "Case study coming soon": "Estudo de caso em breve",
    "Root-cause analysis · 5 Whys": "Análise de causa raiz · 5 Porquês",
    "Why 1": "Porquê 1", "Why 2": "Porquê 2", "Why 3": "Porquê 3", "Why 4": "Porquê 4", "Root cause": "Causa raiz",
    "CAT record · eSocial S-2210": "Registro da CAT · eSocial S-2210",
    "AI · Hackathon project": "IA · Projeto de hackathon",
    "SafeCAT AI: accident reports with root-cause analysis": "SafeCAT AI: comunicação de acidentes com análise de causa raiz",
    "Records workplace accidents with the data eSocial S-2210 (CAT) requires, plus a Claude-assisted 5-Whys analysis and an HSE dashboard.": "Registra acidentes de trabalho com os dados que o eSocial S-2210 (CAT) exige, com análise dos 5 Porquês apoiada pelo Claude e um painel de SST.",
    "Hi! Do you have Thursday at 3pm?": "Oi! Tem horário quinta às 15h?",
    "Thursday 3:00pm is open. Book it?": "Quinta às 15h está livre. Posso agendar?",
    "Yes, please!": "Sim, por favor!",
    "Booked ✓ Thursday, 3:00pm": "Agendado ✓ Quinta, 15h",
    "Product · Solo build": "Produto · Construído sozinha",
    "Secretária IA: a WhatsApp receptionist that books for you": "Secretária IA: uma recepcionista de WhatsApp que agenda por você",
    "Virtual receptionist for appointment-based businesses: multi-tenant agenda, Stripe billing and Gemini.": "Recepcionista virtual para negócios de agendamento: agenda multi-tenant, cobrança com Stripe e Gemini.",

    /* Home: more projects */
    "Also built": "Também construí", "More projects.": "Mais projetos.",
    "AI safety · Reference implementation": "Segurança de IA · Implementação de referência",
    "An approval gate for AI agent actions: proposals are classified by risk, routed to auto-approve, human review or a hard block, and logged in a SHA-256 hash-chained audit trail. Execution is simulated.": "Uma barreira de aprovação para ações de agentes de IA: as propostas são classificadas por risco, encaminhadas para aprovação automática, revisão humana ou bloqueio e registradas em uma trilha de auditoria encadeada com SHA-256. A execução é simulada.",
    "Code →": "Código →", "Live app →": "App no ar →",
    "Product · PWA": "Produto · PWA",
    "A personal organizer for tasks, deadlines, habits and focus sessions in one installable PWA, with offline storage and an Eisenhower matrix.": "Um organizador pessoal de tarefas, prazos, hábitos e sessões de foco em um PWA instalável, com armazenamento offline e matriz de Eisenhower.",
    "Full stack · Inventory": "Full stack · Estoque",
    "Simple inventory control for small businesses: look up products, record stock in and out, and check balances without spreadsheets.": "Controle de estoque simples para pequenos negócios: consulte produtos, registre entradas e saídas e confira o saldo sem planilhas.",

    /* Home: lab */
    "03 — Lab": "03 — Laboratório",
    "Jarvis, my personal AI that runs on my own machine.": "Jarvis, minha IA pessoal que roda na minha própria máquina.",
    "A personal assistant on a local LLM (Ollama) that talks over Telegram and acts through 25 real tools. Measured, not assumed: qwen2.5:3b picks the right tool in 82.1% of 78 requests, and switching from vector search to BM25 lifted RAG recall@1 from 44.4% to 83.3%.": "Um assistente pessoal com LLM local (Ollama) que conversa pelo Telegram e age com 25 ferramentas reais. Medido, não suposto: o qwen2.5:3b escolhe a ferramenta certa em 82,1% de 78 pedidos, e trocar a busca vetorial por BM25 levou o recall@1 do RAG de 44,4% para 83,3%.",
    "Local LLM": "LLM local",
    "View on GitHub → codebyjuliamendes/jarvis": "Ver no GitHub → codebyjuliamendes/jarvis",
    "Illustrative chat": "Chat ilustrativo",
    "Jarvis, summarize my day": "Jarvis, resuma meu dia",
    "Here is your summary. Want me to set reminders?": "Aqui está seu resumo. Quer que eu crie lembretes?",
    "Yes, for 5 pm": "Sim, para as 17h",
    "Done. I will ping you on Telegram.": "Pronto. Aviso você no Telegram.",

    /* Home: stack and contact */
    "04 — Stack": "04 — Stack", "Tools I reach for.": "Ferramentas que eu uso.",
    "AI": "IA", "Build": "Construir", "Data & infra": "Dados e infra",
    "05 — Contact": "05 — Contato",
    "Let’s build something people": "Vamos construir algo em que as pessoas",
    "trust.": "confiem.",
    "Open to GenAI internships starting February 2027, remote, 30 h/week. Tell me what you’re building. For freelance work, see": "Aberta a estágios em GenAI a partir de fevereiro de 2027, remoto, 30 h/semana. Conte o que você está construindo. Para trabalhos freelance, veja",
    "Email me →": "Me envie um e-mail →",

    /* Work with me */
    "Services": "Serviços", "Process": "Processo", "Case studies": "Estudos de caso", "Book a call": "Agendar conversa",
    "I build AI-powered software": "Eu construo software com IA",
    "and keep it running.": "e mantenho funcionando.",
    "Web apps, AI agents and automations for businesses that want results, not demos. From the first prototype to monthly maintenance, one person owns it end to end.": "Apps web, agentes de IA e automações para negócios que querem resultado, não demo. Do primeiro protótipo à manutenção mensal, uma pessoa cuida de tudo de ponta a ponta.",
    "Book a free intro call": "Agendar conversa inicial gratuita", "See case studies": "Ver estudos de caso",
    "01 — Services": "01 — Serviços", "Three ways to work together.": "Três formas de trabalharmos juntos.",
    "Software built to ship": "Software feito para ir ao ar",
    "Web apps, MVPs, chat and WhatsApp agents, internal tools and automations with n8n, RAG and MCP.": "Apps web, MVPs, agentes de chat e WhatsApp, ferramentas internas e automações com n8n, RAG e MCP.",
    "Scoped per project · from 2 weeks": "Escopo por projeto · a partir de 2 semanas",
    "Maintain": "Manter", "Monthly retainer": "Contrato mensal",
    "Monitoring, bug fixes, model and dependency updates, small improvements. Your product keeps working while you run the business.": "Monitoramento, correção de bugs, atualização de modelos e dependências, pequenas melhorias. Seu produto continua funcionando enquanto você cuida do negócio.",
    "Fixed monthly fee · cancel anytime": "Valor mensal fixo · cancele quando quiser",
    "Enable": "Capacitar", "AI for your team": "IA para o seu time",
    "Hands-on workshops on Claude, ChatGPT and AI workflows, tailored to your team’s real tasks and data-safety needs.": "Oficinas práticas de Claude, ChatGPT e fluxos com IA, sob medida para as tarefas reais e as necessidades de segurança de dados do seu time.",
    "Half-day or multi-session · remote": "Meio período ou várias sessões · remoto",
    "02 — Track record": "02 — Histórico", "Built, shipped and used.": "Construído, entregue e usado.",
    "A multi-tenant WhatsApp receptionist that books appointments, with Stripe billing and a business dashboard.": "Uma recepcionista de WhatsApp multi-tenant que agenda consultas, com cobrança via Stripe e painel do negócio.",
    "3rd place at Hackathon Equatorial, then a live pilot with the jury: an AI curator that connects colleagues by what they know.": "3º lugar no Hackathon Equatorial e depois um piloto real com a banca: uma curadoria de IA que conecta colegas pelo que elas sabem.",
    "AI workshops": "Oficinas de IA",
    "Claude training sessions for a law firm team, focused on real daily tasks and safe use of data.": "Sessões de treinamento em Claude para a equipe de um escritório de advocacia, focadas em tarefas reais do dia a dia e uso seguro de dados.",
    "03 — Process": "03 — Processo", "How a project runs.": "Como um projeto funciona.",
    "Discovery call": "Conversa de descoberta",
    "30 minutes to understand the problem, users and constraints. Free.": "30 minutos para entender o problema, os usuários e as restrições. Gratuita.",
    "Scoped proposal": "Proposta com escopo",
    "A clear scope, timeline and price within 48 hours. No surprises.": "Escopo, prazo e preço claros em até 48 horas. Sem surpresas.",
    "Build in weekly demos": "Construção com demos semanais",
    "You see working software every week and steer as we go.": "Você vê software funcionando toda semana e ajusta a direção durante o caminho.",
    "Launch and maintain": "Lançamento e manutenção",
    "Deploy, document and, if you want, a monthly plan to keep it healthy.": "Deploy, documentação e, se quiser, um plano mensal para mantê-lo saudável.",
    "I run what I sell": "Eu uso o que eu vendo",
    "Jarvis: my own AI assistant, running locally.": "Jarvis: meu próprio assistente de IA, rodando localmente.",
    "A personal assistant on a local LLM (Ollama) with a Telegram bot and 25 real tools. It is how I test agents, evals and local inference before recommending them to clients, including setups where the model runs on your own hardware.": "Um assistente pessoal com LLM local (Ollama), bot do Telegram e 25 ferramentas reais. É como eu testo agentes, avaliações e inferência local antes de recomendar a clientes, inclusive cenários em que o modelo roda no seu próprio hardware.",
    "Privacy-first": "Privacidade em primeiro lugar", "Local models for sensitive data": "Modelos locais para dados sensíveis",
    "Measured": "Medido", "Tool choice and RAG evaluated, not assumed": "Escolha de ferramentas e RAG avaliados, não supostos",
    "Agent prototyping": "Prototipagem de agentes", "Fast experiments before client builds": "Experimentos rápidos antes de construir para clientes",
    "Languages": "Idiomas", "English and Portuguese": "Inglês e português",
    "Time zone": "Fuso horário", "UTC−3, overlap with US and EU mornings": "UTC−3, sobreposição com as manhãs dos EUA e da Europa",
    "Billing": "Cobrança", "Invoices in USD, EUR or BRL": "Notas em USD, EUR ou BRL",
    "04 — Let’s talk": "04 — Vamos conversar",
    "Have something worth building or keeping alive?": "Tem algo que vale a pena construir ou manter vivo?",

    /* Case: Entre Elas */
    "Case study · Hackathon Equatorial · 3rd place": "Estudo de caso · Hackathon Equatorial · 3º lugar",
    "An AI curator that connects women across a large company through 20-minute conversations called Faíscas, matching people by meaning instead of job titles.": "Uma curadoria de IA que conecta mulheres de uma grande empresa por meio de conversas de 20 minutos chamadas Faíscas, aproximando pessoas pelo significado e não pelo cargo.",
    "Data & AI, plus app development": "Dados e IA, além do desenvolvimento do app",
    "2 developers + 1 designer": "2 devs + 1 designer",
    "1-week MVP, then a live pilot with the jury": "MVP em 1 semana, depois um piloto real com a banca",
    "Networking happens after hours.": "O networking acontece fora do expediente.",
    "Women in a large company rarely meet people outside their own team, and the usual networking happens after work, exactly when many of them, such as caregivers and mothers of atypical children, have no time.": "Mulheres de uma grande empresa raramente conhecem pessoas fora do próprio time, e o networking costuma acontecer depois do trabalho, justamente quando muitas, como cuidadoras e mães de crianças atípicas, não têm tempo.",
    "The brief: a solution that lets colleagues exchange knowledge during work hours, with leadership able to see whether it actually connects different areas and regions.": "O desafio: uma solução que permita trocar conhecimento durante o expediente, com a liderança podendo ver se ela realmente conecta áreas e regiões diferentes.",
    "02 — How the curator works": "02 — Como a curadoria funciona",
    "From a free-text request to an explained match.": "De um pedido em texto livre a uma conexão explicada.",
    "Free-text request": "Pedido em texto livre",
    "“I need someone who can help me evaluate a RAG pipeline.”": "“Preciso de alguém que possa me ajudar a avaliar um pipeline de RAG.”",
    "Extract needs": "Extrair necessidades",
    "The LLM turns the request into 2 or 3 skills, returned as JSON validated with Zod.": "O LLM transforma o pedido em 2 ou 3 saberes, devolvidos em JSON validado com Zod.",
    "Semantic search": "Busca semântica",
    "Embeddings + pgvector find people by similarity, not keywords.": "Embeddings + pgvector encontram pessoas por similaridade, não por palavras-chave.",
    "Rank & explain": "Ranquear e explicar",
    "Up to 3 people, each with the literal evidence from their profile. Nothing invented.": "Até 3 pessoas, cada uma com a evidência literal do seu perfil. Nada inventado.",
    "Faísca": "Faísca",
    "A 20-minute conversation, scheduled inside work hours.": "Uma conversa de 20 minutos, agendada dentro do expediente.",
    "Resilience": "Resiliência",
    "Gemini → Groq as automatic fallback. If the AI fails or times out, the participant continues on a manual path.": "Gemini → Groq como alternativa automática. Se a IA falhar ou demorar demais, a participante segue por um caminho manual.",
    "Semantic search over keyword filters": "Busca semântica em vez de filtros por palavra-chave",
    "People describe needs in free text. Embeddings match meaning, so “help with model evaluation” can find someone who never wrote that exact phrase.": "As pessoas descrevem necessidades em texto livre. Embeddings casam significado, então “ajuda com avaliação de modelos” encontra alguém que nunca escreveu essa frase exata.",
    "Every recommendation cites evidence": "Toda recomendação cita evidências",
    "The model may only use facts that exist in the profile. If there is no evidence, it says so. This is what keeps the curator trustworthy.": "O modelo só pode usar fatos que existem no perfil. Se não há evidência, ele diz isso. É isso que mantém a curadoria confiável.",
    "Schema-validated JSON outputs": "Saídas em JSON validadas por schema",
    "Prompts do one task at a time and answer in JSON validated with Zod, so invalid output never reaches the screen.": "Os prompts fazem uma tarefa por vez e respondem em JSON validado com Zod, então uma saída inválida nunca chega à tela.",
    "Privacy by design": "Privacidade por design",
    "AI use is opt-in, a tip is published only when both participants agree, and chat messages never feed the knowledge map.": "O uso de IA é opcional, uma dica só é publicada quando as duas participantes autorizam, e as mensagens do chat nunca alimentam o mapa de saberes.",
    "A dashboard for leadership": "Um painel para a liderança",
    "Aggregate numbers only: acceptance rate, connections across regions and areas, and knowledge that only one person holds.": "Só números agregados: taxa de aceite, conexões entre regionais e áreas e saberes que só uma pessoa tem.",
    "1 week": "1 semana", "From brief to working MVP": "Do desafio ao MVP funcionando",
    "6 days": "6 dias", "Live pilot with the jury": "De piloto real com a banca",
    "Live": "No ar", "Public demo on Vercel": "Demo pública na Vercel",
    "Demo mode, with fictional people and data.": "Modo demonstração, com pessoas e dados fictícios.",
    "Demo mode, desktop. Fictional people and data.": "Modo demonstração, desktop. Pessoas e dados fictícios.",
    "Installable PWA, mobile.": "PWA instalável, mobile.",
    "Open the live demo →": "Abrir a demo online →",
    "What a production version needs.": "O que uma versão de produção precisa.",
    "Measure match quality": "Medir a qualidade das conexões",
    "Build an evaluation set of real requests with expected matches and report precision@3 on every change.": "Montar um conjunto de avaliação com pedidos reais e conexões esperadas e reportar precision@3 a cada mudança.",
    "Hybrid search + reranking": "Busca híbrida + reranking",
    "Combine keyword and vector search, then rerank, to cover exact names and rare skills.": "Combinar busca por palavra-chave e vetorial e depois reranquear, para cobrir nomes exatos e habilidades raras.",
    "Load-test the index": "Teste de carga no índice",
    "Check pgvector latency and LLM cost per request at 10,000 profiles before a real rollout.": "Medir latência do pgvector e custo de LLM por requisição com 10.000 perfis antes de um lançamento real.",

    /* Case: SafeCAT AI */
    "Case study · AI · Hackathon project": "Estudo de caso · IA · Projeto de hackathon",
    "A web app for workplace safety teams to record accidents with the data the eSocial S-2210 (CAT) event requires, investigate the root cause with an AI-assisted 5 Whys, and track safety indicators.": "Uma aplicação web para equipes de segurança do trabalho registrarem acidentes com os dados que o evento S-2210 (CAT) do eSocial exige, investigarem a causa raiz com os 5 Porquês apoiados por IA e acompanharem indicadores de segurança.",
    "Context": "Contexto", "Hackathon, SESMT & Industry 4.0": "Hackathon, SESMT e Indústria 4.0",
    "Claude with structured output, plus a key-free demo mode": "Claude com saída estruturada, mais um modo demonstração sem chave",
    "Quality": "Qualidade", "ruff, mypy --strict and pytest in CI": "ruff, mypy --strict e pytest no CI",
    "Accident reports are slow and error-prone.": "Comunicar acidentes é lento e sujeito a erro.",
    "Filing a CAT means classifying the body part, causing agent, triggering situation and type of injury against eSocial tables, and transcribing the medical certificate. Mistakes and delays mean rework and penalties.": "Preencher a CAT exige classificar parte do corpo, agente causador, situação geradora e natureza da lesão pelas tabelas do eSocial, além de transcrever o atestado. Erros e atrasos geram retrabalho e penalidades.",
    "After filing, many incidents never get a root-cause investigation or an action plan, so the organization loses the chance to prevent a more serious accident.": "Depois do envio, muitas ocorrências não passam por investigação de causa raiz nem por plano de ação, e a organização perde a chance de evitar um acidente mais grave.",
    "02 — How a report flows": "02 — Como um registro flui",
    "From a medical certificate to a reviewed analysis.": "Do atestado a uma análise revisada.",
    "Read the certificate": "Ler o atestado",
    "Text PDFs are read with pypdf. Scans go to the LLM’s vision only when a key is set. No field is filled unless it comes from the file.": "PDFs com texto são lidos com pypdf. Arquivos escaneados vão para a visão do LLM só quando há chave configurada. Nenhum campo é preenchido sem vir do arquivo.",
    "Validate the CAT": "Validar a CAT",
    "CPF, PIS/NIT, CID-10 and date checks, plus a list of S-2210 fields still missing.": "Checagens de CPF, PIS/NIT, CID-10 e datas, mais a lista de campos do S-2210 que ainda faltam.",
    "Suggest 5 Whys": "Sugerir os 5 Porquês",
    "Claude returns JSON validated against Pydantic models, with causes and controls.": "O Claude devolve JSON validado contra modelos Pydantic, com causas e controles.",
    "Check the evidence": "Conferir as evidências",
    "Every quote the AI cites is checked against the report. If it is not there, that level is discarded.": "Todo trecho que a IA cita é conferido contra o relato. Se não estiver lá, aquele nível é descartado.",
    "Human review": "Revisão humana",
    "The safety team edits, reviews and signs. The record keeps who reviewed it.": "A equipe de segurança edita, revisa e assina. O registro guarda quem revisou.",
    "Demo mode": "Modo demonstração",
    "Without an API key, a deterministic mode asks the 5 Whys questions without answering them and never proposes a root cause.": "Sem chave de API, um modo determinístico faz as perguntas dos 5 Porquês sem respondê-las e nunca propõe causa raiz.",
    "Never invent a code": "Nunca inventar um código",
    "The eSocial tables 13 to 17 ship empty until they are imported from the official source, because a made-up code would produce a wrong CAT.": "As tabelas 13 a 17 do eSocial vêm vazias até serem importadas da fonte oficial, porque um código inventado geraria uma CAT errada.",
    "Prompt-injection defenses": "Defesas contra prompt injection",
    "A fixed system prompt, user text sent as delimited data, delimiters neutralized, and every cited piece of evidence checked against the report.": "Prompt de sistema fixo, texto do usuário enviado como dado delimitado, delimitadores neutralizados e toda evidência citada conferida contra o relato.",
    "An auxiliary document, not a filing": "Um documento auxiliar, não um envio",
    "The PDF only contains validated data, marks missing fields as “not provided” and states that the official CAT is sent through eSocial.": "O PDF só contém dados validados, marca campos ausentes como “não informado” e avisa que a CAT oficial é transmitida pelo eSocial.",
    "LGPD by design": "LGPD desde o projeto",
    "Masked CPF in lists, logs with IDs only, permanent deletion and a configurable retention purge.": "CPF mascarado nas listagens, logs só com IDs, exclusão definitiva e expurgo por prazo de retenção configurável.",
    "Hardened deployment": "Implantação endurecida",
    "A multi-stage image that runs as non-root with a read-only filesystem, health checks and Kubernetes manifests.": "Imagem multi-stage que roda sem root, com sistema de arquivos somente leitura, health checks e manifests de Kubernetes.",
    "Test coverage of the domain rules": "Cobertura de testes das regras de domínio",
    "Minimum coverage enforced in CI": "Cobertura mínima exigida no CI",
    "Network calls in the LLM tests": "Chamadas de rede nos testes do LLM",
    "eSocial layout checked against the XSD": "Leiaute do eSocial conferido no XSD",
    "HSE dashboard in demo mode.": "Painel de SST em modo demonstração.",
    "HSE dashboard, desktop. Demo data.": "Painel de SST, desktop. Dados de demonstração.",
    "Mobile view.": "Versão mobile.",
    "Import the official tables": "Importar as tabelas oficiais",
    "Load eSocial tables 13 to 17 from the current official release and compare the CID-10 file with the latest DATASUS publication.": "Carregar as tabelas 13 a 17 do eSocial da versão oficial vigente e comparar o arquivo da CID-10 com a publicação atual do DATASUS.",
    "Add authentication": "Adicionar autenticação",
    "The app has no access control of its own yet. Put SSO or an OIDC proxy in front of it before real use.": "O app ainda não tem controle de acesso próprio. Antes do uso real, coloque SSO ou um proxy OIDC na frente dele.",
    "Generate the S-2210 XML": "Gerar o XML do S-2210",
    "Today it neither builds the XML nor transmits to eSocial, and the auxiliary PDF does not replace the official CAT.": "Hoje ele não gera o XML nem transmite ao eSocial, e o PDF auxiliar não substitui a CAT oficial.",

    /* Case: Secretária IA */
    "Case study · Product · Solo build": "Estudo de caso · Produto · Construído sozinha",
    "A multi-tenant virtual receptionist on WhatsApp. It answers patients, books only into real free slots and hands over to a human when needed. Built first for health and aesthetics clinics, now for any appointment-based business.": "Uma recepcionista virtual multi-tenant no WhatsApp. Atende pacientes, agenda apenas em horários realmente livres e passa para um humano quando necessário. Criada primeiro para clínicas de saúde e estética, agora para qualquer negócio de agendamento.",
    "Product, backend, frontend and AI": "Produto, backend, frontend e IA",
    "Solo build": "Construído sozinha",
    "Being offered to early customers": "Sendo oferecida aos primeiros clientes",
    "Small businesses lose bookings in the inbox.": "Pequenos negócios perdem agendamentos na caixa de entrada.",
    "Clinics and service businesses answer clients on WhatsApp by hand, often outside working hours. Messages wait, slots go unfilled and the team is interrupted all day to confirm times.": "Clínicas e negócios de serviço respondem clientes no WhatsApp na mão, muitas vezes fora do expediente. Mensagens esperam, horários ficam vagos e a equipe é interrompida o dia todo para confirmar horários.",
    "The goal: an assistant that holds the conversation, checks the real agenda, books or cancels, and never pretends to know what it does not, while each business keeps its own data fully separate.": "O objetivo: um assistente que conduz a conversa, consulta a agenda real, agenda ou cancela e nunca finge saber o que não sabe, com os dados de cada negócio totalmente separados.",
    "02 — How a message is handled": "02 — Como uma mensagem é tratada",
    "From a WhatsApp message to a safe action.": "De uma mensagem no WhatsApp a uma ação segura.",
    "Webhook in": "Webhook de entrada",
    "Evolution API forwards the patient’s message to the FastAPI backend.": "A Evolution API encaminha a mensagem do paciente ao backend FastAPI.",
    "Guard checks": "Checagens de guarda",
    "Idempotency per tenant, account status, plan and usage quota.": "Idempotência por tenant, status da conta, plano e cota de uso.",
    "Build context": "Montar contexto",
    "Patient history plus the clinic’s real availability and knowledge base.": "Histórico do paciente mais a disponibilidade real e a base de conhecimento da clínica.",
    "Gemini decides": "O Gemini decide",
    "Returns validated JSON: reply, book, cancel or hand off to staff.": "Devolve JSON validado: responder, agendar, cancelar ou passar para a equipe.",
    "Reliable delivery": "Entrega confiável",
    "A Postgres queue sends replies with retry and backoff.": "Uma fila no Postgres envia as respostas com retry e backoff.",
    "Fallback": "Fallback",
    "If AI is not configured or fails, a rule-based flow keeps answering, so the receptionist never goes silent.": "Se a IA não estiver configurada ou falhar, um fluxo baseado em regras continua respondendo, e a recepcionista nunca fica muda.",
    "Book only into free slots": "Agendar apenas em horários livres",
    "The model proposes, the backend verifies. Appointments are created only in slots that are actually available, so the AI cannot double-book.": "O modelo propõe, o backend verifica. Agendamentos só são criados em horários realmente disponíveis, então a IA não faz overbooking.",
    "Tenant isolation from the URL": "Isolamento de tenant desde a URL",
    "Each clinic is isolated by design, with role-based permissions (owner, manager, staff, super admin) and audit logs.": "Cada clínica é isolada por design, com permissões por papel (dona, gerente, equipe, super admin) e logs de auditoria.",
    "Persistent queue instead of fire-and-forget": "Fila persistente em vez de disparar e esquecer",
    "Outgoing messages live in Postgres and are retried with backoff, so a provider hiccup does not lose a reply.": "As mensagens de saída ficam no Postgres e são reenviadas com backoff, então uma falha do provedor não perde uma resposta.",
    "Security on every edge": "Segurança em todas as bordas",
    "Short-lived JWTs with rotating refresh tokens kept in httpOnly cookies through a backend-for-frontend, signed webhooks and rate limiting.": "JWTs de curta duração com refresh tokens rotativos em cookies httpOnly via backend-for-frontend, webhooks assinados e rate limiting.",
    "Built for the business side too": "Pensada também para o lado do negócio",
    "Plans with quotas, Stripe billing, Pix and boleto, Google Calendar sync, a human-handoff inbox, return campaigns and LGPD data-deletion support.": "Planos com cotas, cobrança via Stripe, Pix e boleto, sincronização com Google Calendar, caixa de atendimento humano, campanhas de retorno e suporte à exclusão de dados da LGPD.",
    "Tenant isolation covered by tests": "Isolamento entre tenants coberto por testes",
    "Real DB": "Banco real", "Tests run against PostgreSQL": "Testes rodam em PostgreSQL",
    "Lint, types and build checks": "Lint, tipos e build verificados",
    "Data deletion support": "Suporte à exclusão de dados",
    "Measure conversation quality": "Medir a qualidade das conversas",
    "Build a test set of real conversations and track booking success, handoff rate and wrong-action rate on every change.": "Montar um conjunto de testes com conversas reais e acompanhar taxa de agendamento, de transferência e de ação errada a cada mudança.",
    "Observability per tenant": "Observabilidade por tenant",
    "Dashboards for latency, LLM cost per conversation and queue health to price plans on real data.": "Painéis de latência, custo de LLM por conversa e saúde da fila para precificar planos com dados reais.",
    "More channels": "Mais canais",
    "Reuse the same core for Instagram and web chat, keeping one agenda and one knowledge base.": "Reaproveitar o mesmo núcleo para Instagram e chat web, mantendo uma agenda e uma base de conhecimento."
  };
  var ATTR = {
    "Menu": "Menu", "Main": "Principal", "Language": "Idioma",
    "Highlights": "Destaques", "Results": "Resultados", "Practicalities": "Informações práticas",
    "Illustrative chat": "Chat ilustrativo",
    "Entre Elas demo, desktop": "Demo do Entre Elas, desktop",
    "Entre Elas demo, mobile": "Demo do Entre Elas, mobile",
    "SafeCAT AI HSE dashboard with a body map and incidents per sector, desktop": "Painel de SST do SafeCAT AI com mapa corporal e ocorrências por setor, desktop",
    "SafeCAT AI on mobile": "SafeCAT AI no celular"
  };

  var orig = new WeakMap(), origAttr = new WeakMap();
  function walk(node, fn) {
    if (node.nodeType === 3) { fn(node); return; }
    if (node.nodeType !== 1 || /^(SCRIPT|STYLE)$/.test(node.tagName)) return;
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c, fn);
  }
  function apply(lang) {
    var pt = lang === 'pt';
    document.documentElement.lang = pt ? 'pt-BR' : 'en';
    walk(document.body, function (n) {
      if (!orig.has(n)) orig.set(n, n.nodeValue);
      var o = orig.get(n), m = o.match(/^(\s*)([\s\S]*?)(\s*)$/);
      n.nodeValue = (pt && PT[m[2]]) ? m[1] + PT[m[2]] + m[3] : o;
    });
    document.querySelectorAll('[alt],[aria-label]').forEach(function (el) {
      if (!origAttr.has(el)) origAttr.set(el, {});
      var store = origAttr.get(el);
      ['alt', 'aria-label'].forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        if (!(a in store)) store[a] = el.getAttribute(a);
        el.setAttribute(a, pt && ATTR[store[a]] ? ATTR[store[a]] : store[a]);
      });
    });
    var d = document.querySelector('meta[name=description]');
    if (d && d.dataset.pt) {
      if (!d.dataset.en) d.dataset.en = d.content;
      d.content = pt ? d.dataset.pt : d.dataset.en;
    }
    var root = document.documentElement;
    if (!root.dataset.t) root.dataset.t = document.title;
    var t = root.dataset.t, tpt = document.body.dataset.titlePt;
    document.title = !pt ? t : (tpt || t.replace('Generative AI Developer', 'Desenvolvedora de IA Generativa'));
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.l === lang ? 'true' : 'false');
    });
  }
  function get() { try { return localStorage.getItem('lang'); } catch (e) { return null; } }
  function set(l) { try { localStorage.setItem('lang', l); } catch (e) {} }
  function init() {
    var slot = document.querySelector('.nav .lang-slot') || document.querySelector('nav .links');
    if (slot) {
      var w = document.createElement('div');
      w.className = 'lang';
      w.setAttribute('role', 'group');
      w.setAttribute('aria-label', 'Language');
      w.innerHTML = '<button type="button" data-l="en">EN</button><button type="button" data-l="pt">PT</button>';
      slot.appendChild(w);
      w.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        set(b.dataset.l); apply(b.dataset.l);
      });
    }
    var saved = get();
    var lang = saved || ((navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
    apply(lang);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
