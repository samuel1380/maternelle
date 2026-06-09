# 🌸 Maternelle - Clínica Estética & Bem-Estar

Este é o repositório do site institucional da **Maternelle Clínica Estética**, focada em pós-parto, autocuidado e bem-estar. O projeto foi desenvolvido com uma arquitetura moderna e de altíssima performance utilizando HTML5, CSS3 Vanilla e JavaScript.

---

## 🚀 Como subir no Render (Passo a Passo)

O projeto já está 100% configurado para o **Render**. Graças ao arquivo [render.yaml](./render.yaml), o deploy é praticamente automático. 

### Passo 1: Enviar o código para o GitHub
1. Crie um repositório **público ou privado** no seu GitHub (ex: `maternelle-estetica`).
2. Abra a pasta do projeto no seu terminal e envie os arquivos para o repositório:
   ```bash
   git init
   git add .
   git commit -m "feat: site da Maternelle com chatbot de WhatsApp"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

### Passo 2: Fazer o Deploy no Render
1. Acesse o painel do [Render](https://dashboard.render.com/) e faça login (pode usar sua conta do GitHub).
2. Clique no botão **New +** (canto superior direito) e selecione **Blueprint**.
3. Conecte sua conta do GitHub e selecione o repositório do projeto.
4. O Render lerá o arquivo `render.yaml` automaticamente!
5. Clique em **Apply** e aguarde de 1 a 2 minutos.
6. Pronto! O Render fornecerá uma URL pública (ex: `https://maternelle-estetica.onrender.com`) para acessar o seu site de qualquer lugar do mundo! 🎉

---

## 💻 Como rodar localmente

Se você quiser visualizar e testar o projeto no seu próprio computador antes de fazer o deploy:

### Opção A: Sem instalar nada
Basta abrir a pasta do projeto no seu gerenciador de arquivos e dar dois cliques sobre o arquivo **[index.html](./index.html)**. Ele abrirá diretamente no seu navegador.

### Opção B: Rota NPM (Recomendado para simular o servidor de produção)
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Abra o terminal na pasta do projeto e instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000` (ou a porta exibida) no seu navegador. Ele atualizará automaticamente caso você faça alterações no código.

---

## 📁 Estrutura de Diretórios do Projeto

```text
maternelle-estetica/
├── index.html          # Estrutura do site e chatbot do WhatsApp
├── style.css           # Estilos, fontes, paleta Rosé Gold e responsividade
├── script.js           # Menu mobile, efeito Scroll Reveal e lógica do chatbot
├── assets/             # Imagens otimizadas do site e a logo da clínica
│   ├── logo.jpg        # Imagem oficial da sua logo
│   ├── hero.png        # Foto da recepção da clínica com a logo na parede
│   ├── sobre.png       # Foto da especialista (sobre nós)
│   ├── facial.png      # Tratamento: Limpeza de pele
│   ├── microagulhamento.png  # Tratamento: Microagulhamento
│   ├── preenchimento.png     # Tratamento: Harmonização e Preenchimento
│   ├── drenagem_pos.png      # Tratamento: Drenagem pós-operatória
│   ├── endermoterapia.png    # Tratamento: Endermoterapia
│   └── diastase.png    # Tratamento: Diástase e flacidez abdominal
├── render.yaml         # Configuração de Deploy Automático no Render
├── .gitignore          # Arquivos ignorados pelo controle de versão Git
└── package.json        # Dependências e scripts locais
```

---

> [!TIP]
> **Alterar o número do WhatsApp de Atendimento:**
> Abra o arquivo `script.js` e altere o número de telefone na **linha 279** de `'5511999999999'` para o número real da clínica (mantenha apenas números, incluindo o DDI 55 + DDD + Número do Celular).
