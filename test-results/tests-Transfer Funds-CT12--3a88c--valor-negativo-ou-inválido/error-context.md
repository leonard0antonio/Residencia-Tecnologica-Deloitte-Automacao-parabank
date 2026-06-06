# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Transfer Funds\CT12-Tentativa-de-transferencia-com-valor-negativo-ou-invalido.spec.ts >> CT12 - Tentativa de transferência com valor negativo ou inválido
- Location: tests\Transfer Funds\CT12-Tentativa-de-transferencia-com-valor-negativo-ou-invalido.spec.ts:54:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo com um valor negativo.
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
        - paragraph [ref=e29]: Welcome Jailyn Grant
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
        - heading "Transfer Complete!" [level=1] [ref=e51]
        - paragraph [ref=e52]: "-$500.00 has been transferred from account #34767 to account #34767."
        - paragraph [ref=e53]: See Account Activity for more details.
  - generic [ref=e55]:
    - list [ref=e56]:
      - listitem [ref=e57]:
        - link "Home" [ref=e58] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e59]:
        - link "About Us" [ref=e60] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e61]:
        - link "Services" [ref=e62] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e63]:
        - link "Products" [ref=e64] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e65]:
        - link "Locations" [ref=e66] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e67]:
        - link "Forum" [ref=e68] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e69]:
        - link "Site Map" [ref=e70] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "Contact Us" [ref=e72] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e73]: © Parasoft. All rights reserved.
    - list [ref=e74]:
      - listitem [ref=e75]: "Visit us at:"
      - listitem [ref=e76]:
        - link "www.parasoft.com" [ref=e77] [cursor=pointer]:
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
  23  |     // Preenchendo o formulário de cadastro
  24  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  25  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  26  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  27  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  28  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  29  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  30  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  31  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  32  | 
  33  |     // Preenchendo os campos de login com os dados gerados
  34  |     await page.locator("[id='customer\\.username']").fill(usuario);
  35  |     await page.locator("[id='customer\\.password']").fill(senha);
  36  |     await page.locator("#repeatedPassword").fill(senha);
  37  | 
  38  |     await page.getByRole("button", { name: "Register" }).click();
  39  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  40  | 
  41  |     await page.close();
  42  | });
  43  | 
  44  | test.beforeEach("Realizar login", async ({ page }) => {
  45  |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  46  | 
  47  |     await page.locator(".login").locator("[name='username']").fill(usuario);
  48  |     await page.locator(".login").locator("[name='password']").fill(senha);
  49  | 
  50  |     await page.getByRole("button", { name: "Log In" }).click();
  51  |     await expect(page.locator("#leftPanel")).toBeVisible();
  52  | });
  53  | 
  54  | test("CT12 - Tentativa de transferência com valor negativo ou inválido", async ({ page }) => {
  55  |     console.log(`Executando CT12 para o usuário: ${nomeUsuario}`);
  56  |     console.log(`Usuário: ${usuario}`);
  57  |     console.log(`Senha: ${senha}`);
  58  | 
  59  |     // Given que o usuário tenha acessado a funcionalidade "Transfer Funds"
  60  |     await page.getByRole("link", { name: "Transfer Funds" }).click();
  61  | 
  62  |     // Aguarda o AJAX do ParaBank carregar os selects das contas antes de interagir com eles
  63  |     await page.waitForTimeout(2000);
  64  | 
  65  |     // And possua saldo disponível na conta de origem
  66  |     // Captura e seleciona a primeira conta disponível como origem
  67  |     const contaOrigemValue = await page.locator("#fromAccountId option").first().getAttribute("value");
  68  |     if (contaOrigemValue) {
  69  |         await page.locator("#fromAccountId").selectOption(contaOrigemValue);
  70  |         // Seleciona a mesma conta também como destino (única disponível para novo usuário)
  71  |         await page.locator("#toAccountId").selectOption(contaOrigemValue);
  72  |     }
  73  | 
  74  |     // When informar um valor negativo, zerado ou texto no campo "Amount" (Preencha com "-500")
  75  |     await page.locator("#amount").fill("-500");
  76  | 
  77  |     // And selecionar as contas de origem e destino (já selecionadas acima)
  78  | 
  79  |     // And clicar no botão "TRANSFER"
  80  |     await page.getByRole("button", { name: "Transfer" }).click();
  81  | 
  82  |     // Aguarda o sistema processar a requisição
  83  |     await page.waitForTimeout(2000);
  84  | 
  85  |     // Verificamos se a mensagem de sucesso está na tela (retorna true ou false)
  86  |     const transferenciaCompletada = await page.getByText("Transfer Complete!").isVisible();
  87  | 
  88  |     if (transferenciaCompletada) {
  89  |         // O sistema permitiu a transferência com valor negativo (Comportamento Inesperado / Bug)
> 90  |         throw new Error("⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo com um valor negativo.");
      |               ^ Error: ⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo com um valor negativo.
  91  |     } else {
  92  |         // Then o sistema não deve realizar a transferência
  93  |         // And deve exibir uma mensagem de erro indicando que o formato do valor é inválido
  94  |         console.log("✅ SUCESSO NO TESTE: O sistema bloqueou a transferência com valor negativo.");
  95  | 
  96  |         // Valida a presença de uma mensagem de erro na tela
  97  |         const mensagemErro = page.locator(".error");
  98  |         await expect(mensagemErro).toBeVisible();
  99  |         await expect(mensagemErro).toContainText(/invalid/i);
  100 |     }
  101 | });
  102 | 
```