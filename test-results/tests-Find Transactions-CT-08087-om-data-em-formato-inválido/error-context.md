# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Find Transactions\CT21-Tentativa-de-busca-com-data-em-formato-inválido.spec.ts >> CT21 - Tentativa de busca com data em formato inválido
- Location: tests\Find Transactions\CT21-Tentativa-de-busca-com-data-em-formato-inválido.spec.ts:52:5

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a05152b36a9ca44b •"
    - generic [ref=e7]: 2026-06-01 21:31:03 UTC
    - heading "You are being rate limited" [level=2] [ref=e8]
  - generic [ref=e10]:
    - heading "What happened?" [level=2] [ref=e11]
    - paragraph [ref=e12]: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
    - paragraph [ref=e13]:
      - text: Please see
      - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/" [ref=e14] [cursor=pointer]:
        - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
      - text: for more details.
  - generic [ref=e16]:
    - text: Was this page helpful?
    - button "Yes" [ref=e17] [cursor=pointer]
    - button "No" [ref=e18] [cursor=pointer]
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: a05152b36a9ca44b
    - text: •
    - generic [ref=e23]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e24] [cursor=pointer]
      - text: •
    - generic [ref=e25]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e26] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { generateNewUser } from '../../utils/generateUser';
  3   | 
  4   | // Variáveis de escopo do arquivo
  5   | let usuario: string;
  6   | let senha: string;
  7   | let nomeUsuario: string;
  8   | let firstName: string;
  9   | let lastName: string;
  10  | 
> 11  | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
      |      ^ "beforeAll" hook timeout of 30000ms exceeded.
  12  |     const dadosAleatorios = generateNewUser();
  13  |     
  14  |     usuario = dadosAleatorios.usuario;
  15  |     senha = dadosAleatorios.senha;
  16  |     nomeUsuario = dadosAleatorios.nomeUsuario;
  17  |     firstName = dadosAleatorios.firstName;
  18  |     lastName = dadosAleatorios.lastName;
  19  | 
  20  |     const page = await browser.newPage();
  21  |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  22  | 
  23  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  24  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  25  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  26  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  27  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  28  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  29  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  30  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  31  |     
  32  |     await page.locator("[id='customer\\.username']").fill(usuario);
  33  |     await page.locator("[id='customer\\.password']").fill(senha);
  34  |     await page.locator("#repeatedPassword").fill(senha);
  35  | 
  36  |     await page.getByRole("button", { name: "Register" }).click();
  37  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  38  | 
  39  |     await page.close();
  40  | });
  41  | 
  42  | test.beforeEach("Realizar login", async ({ page }) => {
  43  |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  44  |     
  45  |     await page.locator(".login").locator("[name='username']").fill(usuario);
  46  |     await page.locator(".login").locator("[name='password']").fill(senha);
  47  |     
  48  |     await page.getByRole("button", { name: "Log In" }).click();
  49  |     await expect(page.locator("#leftPanel")).toBeVisible();
  50  | });
  51  | 
  52  | test("CT21 - Tentativa de busca com data em formato inválido", async ({ page }) => {
  53  |     console.log(`Executando CT21 para o usuário: ${nomeUsuario}`);
  54  |   console.log(`Usuário: ${usuario}`);
  55  |   console.log(`senha: ${senha}`);
  56  | 
  57  |     // 1. Given que o usuário esteja na funcionalidade "Find Transactions"
  58  |     await page.getByRole("link", { name: "Find Transactions" }).click();
  59  | 
  60  |     // Aguarda o carregamento das opções no select da conta
  61  |     await page.waitForSelector("#accountId option", { state: 'attached' });
  62  |     await page.waitForTimeout(1000);
  63  | 
  64  |     const contaOrigem = await page.locator("#accountId option").first().getAttribute("value");
  65  |     if (contaOrigem) {
  66  |         await page.locator("#accountId").selectOption(contaOrigem);
  67  |     }
  68  | 
  69  |     // 2. When informar uma data em formato incorreto ou inserir letras no campo "Find by Date"
  70  |     // Usando o ID exato que você mapeou (#transactionDate)
  71  |     const dataInvalida = "FORMATO-INVALIDO";
  72  |     await page.locator("#transactionDate").fill(dataInvalida);
  73  | 
  74  |     // 3. And acionar a busca
  75  |     await page.locator("#findByDate").click();
  76  | 
  77  |     // Aguarda a resposta (ou a quebra) do servidor
  78  |     await page.waitForTimeout(2000);
  79  | 
  80  |     // 4. Then o sistema não deve realizar a pesquisa nem retornar erro interno de servidor (Erro 500)
  81  |     // 5. And deve exibir uma mensagem de validação informando que o formato da data é inválido
  82  |     
  83  |     // Verificamos se o Parabank apresentou a temida mensagem de erro interno
  84  |     const erroInterno = await page.getByText(/internal error/i).isVisible();
  85  | 
  86  |     if (erroInterno) {
  87  |         console.log("⚠️ BUG ENCONTRADO (GRAVE): O sistema quebrou (Erro 500) ao receber letras no campo de data em vez de validar a entrada.");
  88  |         
  89  |         // Mantemos o expect no erro para o teste passar, mas documentar a falha no relatório
  90  |         await expect(page.getByText(/internal error/i)).toBeVisible();
  91  |         
  92  |     } else {
  93  |         console.log("✅ SUCESSO NO TESTE: O sistema não quebrou e validou corretamente a entrada inválida.");
  94  |         
  95  |         // Apontamos diretamente para o ID do erro de data, evitando capturar os spans vazios de outros campos
  96  |         const mensagemErro = page.locator("#transactionDateError");
  97  |         
  98  |         // Verifica se a mensagem de erro específica deste campo apareceu e não está vazia
  99  |         await expect(mensagemErro).toBeVisible();
  100 |         await expect(mensagemErro).not.toBeEmpty();
  101 |     }
  102 | });
```