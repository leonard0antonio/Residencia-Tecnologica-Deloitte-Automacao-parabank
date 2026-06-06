# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Find Transactions\CT22-Tentativa-de-busca-com-intervalo-de-datas-ilógico.spec.ts >> CT22 - Tentativa de busca com intervalo de datas ilógico
- Location: tests\Find Transactions\CT22-Tentativa-de-busca-com-intervalo-de-datas-ilógico.spec.ts:52:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO: O sistema ignorou o intervalo ilógico, não validou o erro e tentou realizar a busca.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome Icie Schmeler
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Transaction Results" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row "Date Transaction Debit (-) Credit (+)" [ref=e54]:
              - columnheader "Date" [ref=e55]
              - columnheader "Transaction" [ref=e56]
              - columnheader "Debit (-)" [ref=e57]
              - columnheader "Credit (+)" [ref=e58]
          - rowgroup
  - generic [ref=e60]:
    - list [ref=e61]:
      - listitem [ref=e62]:
        - link "Home" [ref=e63] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e64]:
        - link "About Us" [ref=e65] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e66]:
        - link "Services" [ref=e67] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e68]:
        - link "Products" [ref=e69] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e70]:
        - link "Locations" [ref=e71] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e72]:
        - link "Forum" [ref=e73] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e74]:
        - link "Site Map" [ref=e75] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e76]:
        - link "Contact Us" [ref=e77] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e78]: © Parasoft. All rights reserved.
    - list [ref=e79]:
      - listitem [ref=e80]: "Visit us at:"
      - listitem [ref=e81]:
        - link "www.parasoft.com" [ref=e82] [cursor=pointer]:
          - /url: http://www.parasoft.com/
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
  11  | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
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
  52  | test("CT22 - Tentativa de busca com intervalo de datas ilógico", async ({ page }) => {
  53  |     console.log(`Executando CT22 para o usuário: ${nomeUsuario}`);
  54  |   console.log(`Usuário: ${usuario}`);
  55  |   console.log(`senha: ${senha}`);
  56  | 
  57  |     // 1. Given que o usuário esteja na funcionalidade "Find Transactions"
  58  |     await page.getByRole("link", { name: "Find Transactions" }).click();
  59  | 
  60  |     await page.waitForSelector("#accountId option", { state: 'attached' });
  61  |     await page.waitForTimeout(1000);
  62  | 
  63  |     const contaOrigem = await page.locator("#accountId option").first().getAttribute("value");
  64  |     if (contaOrigem) {
  65  |         await page.locator("#accountId").selectOption(contaOrigem);
  66  |     }
  67  | 
  68  |     // 2. When preencher o campo de data inicial ("Between") com uma data futura
  69  |     // Mapeando com o padrão de IDs compostos do Parabank (se der timeout, ajustaremos para #fromDate)
  70  |     await page.locator("#fromDate").fill("12-31-2026");
  71  | 
  72  |     // 3. And preencher o campo final ("And") com uma data anterior à data inicial
  73  |     // Criando o cenário ilógico: Data Final é MENOR que a Data Inicial
  74  |     await page.locator("#toDate").fill("01-01-2026");
  75  | 
  76  |     // 4. And clicar no botão para buscar por intervalo
  77  |     // Assumindo a nomenclatura lógica dos botões anteriores
  78  |     await page.locator("#findByDateRange").click();
  79  | 
  80  |     await page.waitForTimeout(2000);
  81  | 
  82  |     // 5. Then o sistema deve bloquear a ação
  83  |     // 6. And exibir um alerta indicando que a data inicial não pode ser maior que a data final
  84  | 
  85  |     const erroInterno = await page.getByText(/internal error/i).isVisible();
  86  |     const erroExibido = await page.locator("#dateRangeError").isVisible();
  87  | 
  88  |     if (erroInterno) {
  89  |         throw new Error("⚠️ BUG ENCONTRADO (GRAVE): O sistema estourou Erro 500 ao invés de validar as datas.");
  90  |         
  91  |     } else if (!erroExibido) {
> 92  |         throw new Error("⚠️ BUG ENCONTRADO: O sistema ignorou o intervalo ilógico, não validou o erro e tentou realizar a busca.");
      |               ^ Error: ⚠️ BUG ENCONTRADO: O sistema ignorou o intervalo ilógico, não validou o erro e tentou realizar a busca.
  93  |         
  94  |     } else {
  95  |         console.log("✅ SUCESSO NO TESTE: O sistema validou a regra de negócio e barrou as datas ilógicas.");
  96  |         
  97  |         // Usamos o ID exato mapeado anteriormente no CT20
  98  |         const mensagemErro = page.locator("#dateRangeError");
  99  |         await expect(mensagemErro).toBeVisible();
  100 |         await expect(mensagemErro).not.toBeEmpty();
  101 |     }
  102 | });
```