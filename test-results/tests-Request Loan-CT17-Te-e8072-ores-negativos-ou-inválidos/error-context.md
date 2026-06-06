# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Request Loan\CT17-Tentativa-de-empréstimo-com-valores-negativos-ou-inválidos.spec.ts >> CT17 - Tentativa de empréstimo com valores negativos ou inválidos
- Location: tests\Request Loan\CT17-Tentativa-de-empréstimo-com-valores-negativos-ou-inválidos.spec.ts:52:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO (GRAVE): O sistema processou um pedido de empréstimo com valores NEGATIVOS.
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
        - paragraph [ref=e29]: Welcome Obie Fay
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
        - heading "Loan Request Processed" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - 'row "Loan Provider: Wealth Securities Dynamic Loans (WSDL)" [ref=e54]':
              - cell "Loan Provider:" [ref=e55]
              - cell "Wealth Securities Dynamic Loans (WSDL)" [ref=e56]
            - 'row "Date: 06-5-2026" [ref=e57]':
              - cell "Date:" [ref=e58]
              - cell "06-5-2026" [ref=e59]
            - 'row "Status: Denied" [ref=e60]':
              - cell "Status:" [ref=e61]
              - cell "Denied" [ref=e62]
        - paragraph [ref=e64]: We cannot grant a loan in that amount with your available funds.
  - generic [ref=e66]:
    - list [ref=e67]:
      - listitem [ref=e68]:
        - link "Home" [ref=e69] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e70]:
        - link "About Us" [ref=e71] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e72]:
        - link "Services" [ref=e73] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e74]:
        - link "Products" [ref=e75] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e76]:
        - link "Locations" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e78]:
        - link "Forum" [ref=e79] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e80]:
        - link "Site Map" [ref=e81] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e82]:
        - link "Contact Us" [ref=e83] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e84]: © Parasoft. All rights reserved.
    - list [ref=e85]:
      - listitem [ref=e86]: "Visit us at:"
      - listitem [ref=e87]:
        - link "www.parasoft.com" [ref=e88] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  |   import { test, expect } from '@playwright/test';
  2  | import { generateNewUser } from '../../utils/generateUser';
  3  | 
  4  | // Variáveis de escopo do arquivo
  5  | let usuario: string;
  6  | let senha: string;
  7  | let nomeUsuario: string;
  8  | let firstName: string;
  9  | let lastName: string;
  10 | 
  11 | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
  12 |     const dadosAleatorios = generateNewUser();
  13 |     
  14 |     usuario = dadosAleatorios.usuario;
  15 |     senha = dadosAleatorios.senha;
  16 |     nomeUsuario = dadosAleatorios.nomeUsuario;
  17 |     firstName = dadosAleatorios.firstName;
  18 |     lastName = dadosAleatorios.lastName;
  19 | 
  20 |     const page = await browser.newPage();
  21 |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  22 | 
  23 |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  24 |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  25 |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  26 |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  27 |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  28 |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  29 |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  30 |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  31 |     
  32 |     await page.locator("[id='customer\\.username']").fill(usuario);
  33 |     await page.locator("[id='customer\\.password']").fill(senha);
  34 |     await page.locator("#repeatedPassword").fill(senha);
  35 | 
  36 |     await page.getByRole("button", { name: "Register" }).click();
  37 |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  38 | 
  39 |     await page.close();
  40 | });
  41 | 
  42 | test.beforeEach("Realizar login", async ({ page }) => {
  43 |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  44 |     
  45 |     await page.locator(".login").locator("[name='username']").fill(usuario);
  46 |     await page.locator(".login").locator("[name='password']").fill(senha);
  47 |     
  48 |     await page.getByRole("button", { name: "Log In" }).click();
  49 |     await expect(page.locator("#leftPanel")).toBeVisible();
  50 | });
  51 | 
  52 | test("CT17 - Tentativa de empréstimo com valores negativos ou inválidos", async ({ page }) => {
  53 |     console.log(`Executando CT17 para o usuário: ${nomeUsuario}`);
  54 |     console.log(`Usuário: ${usuario}`);
  55 |     console.log(`senha: ${senha}`);
  56 | 
  57 |     // 1. Given que o usuário esteja na funcionalidade "Apply for a Loan"
  58 |     await page.getByRole("link", { name: "Request Loan" }).click();
  59 | 
  60 |     // 2. When informar caracteres inválidos, valores negativos ou zerados
  61 |     // Vamos enviar valores estritamente negativos e absurdos para forçar o erro
  62 |     await page.locator("#amount").fill("-5000");
  63 |     await page.locator("#downPayment").fill("-500");
  64 | 
  65 |     // 3. And selecionar a conta de origem e clicar no botão "Apply Now"
  66 |     // Espera a opção de conta aparecer usando a técnica do 'attached' para evitar timeout
  67 |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  68 |     await page.waitForTimeout(1000);
  69 | 
  70 |     const contaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  71 |     if (contaOrigem) {
  72 |         await page.locator("#fromAccountId").selectOption(contaOrigem);
  73 |     }
  74 | 
  75 |     await page.getByRole("button", { name: "Apply Now" }).click();
  76 | 
  77 |     // Pausa para aguardar o processamento (ou quebra) da aplicação
  78 |     await page.waitForTimeout(2000);
  79 | 
  80 |     // 4. Then o sistema não deve processar a aprovação da solicitação
  81 |     // 5. And deve retornar uma mensagem de validação indicando que os valores inseridos estão incorretos
  82 | 
  83 |     // Vamos diagnosticar se o sistema engoliu o valor negativo e processou a tela:
  84 |     const bugProcessamento = await page.getByText("Loan Request Processed").isVisible();
  85 | 
  86 |     if (bugProcessamento) {
> 87 |         throw new Error("⚠️ BUG ENCONTRADO (GRAVE): O sistema processou um pedido de empréstimo com valores NEGATIVOS.");
     |               ^ Error: ⚠️ BUG ENCONTRADO (GRAVE): O sistema processou um pedido de empréstimo com valores NEGATIVOS.
  88 |     } else {
  89 |         console.log("✅ SUCESSO NO TESTE: O sistema bloqueou o formulário e não processou valores negativos.");
  90 |         
  91 |         // Verifica se a mensagem de erro (genérica ou de formatação) foi apresentada
  92 |         // Muitas vezes o Parabank apresenta o erro com a classe .error
  93 |         const mensagemErro = page.locator(".error");
  94 |         await expect(mensagemErro).toBeVisible();
  95 |         await expect(mensagemErro).not.toBeEmpty();
  96 |     }
  97 | });
```