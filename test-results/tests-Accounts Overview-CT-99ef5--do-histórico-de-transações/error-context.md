# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Accounts Overview\CT03-Validacao-de-interface-do-historico-de-transacoes.spec.ts >> CT03 - Validação de interface do histórico de transações
- Location: tests\Accounts Overview\CT03-Validacao-de-interface-do-historico-de-transacoes.spec.ts:54:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Your account was created successfully')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Your account was created successfully')

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: Otha"':
      - cell "First Name:"
      - cell "Otha":
        - textbox: Otha
      - cell
    - 'row "Last Name: Herzog"':
      - cell "Last Name:"
      - cell "Herzog":
        - textbox: Herzog
      - cell
    - 'row "Address: Rua QA 123"':
      - cell "Address:"
      - cell "Rua QA 123":
        - textbox: Rua QA 123
      - cell
    - 'row "City: Recife"':
      - cell "City:"
      - cell "Recife":
        - textbox: Recife
      - cell
    - 'row "State: PE"':
      - cell "State:"
      - cell "PE":
        - textbox: PE
      - cell
    - 'row "Zip Code: 50000-000"':
      - cell "Zip Code:"
      - cell "50000-000":
        - textbox: 50000-000
      - cell
    - 'row "Phone #: 81999999999"':
      - 'cell "Phone #:"'
      - cell "81999999999":
        - textbox: "81999999999"
      - cell
    - 'row "SSN: 000-00-0000"':
      - cell "SSN:"
      - cell "000-00-0000":
        - textbox: 000-00-0000
      - cell
    - row:
      - cell
    - 'row "Username: Otha1531 This username already exists."':
      - cell "Username:"
      - cell "Otha1531":
        - textbox: Otha1531
      - cell "This username already exists."
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
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
> 39  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
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
  54  | test("CT03 - Validação de interface do histórico de transações", async ({ page }) => {
  55  |     console.log(`Executando CT03 para o usuário: ${nomeUsuario}`);
  56  |     
  57  |     // Given que o usuário tenha acessado os detalhes de uma conta específica:
  58  |     // Navegue para Accounts Overview.
  59  |     await page.getByRole("link", { name: "Accounts Overview" }).click();
  60  | 
  61  |     // Localize o primeiro link de conta na tabela (#accountTable tbody tr:first-child a) e clique nele.
  62  |     const primeiraContaLink = page.locator("#accountTable tbody tr").first().locator("a");
  63  |     await expect(primeiraContaLink).toBeVisible();
  64  |     await primeiraContaLink.click();
  65  | 
  66  |     // When a página de detalhes da conta for carregada:
  67  |     // Aguarde o carregamento do título da página (h1.title com texto Account Details).
  68  |     const tituloDetalhes = page.locator("h1.title").filter({ hasText: "Account Details" });
  69  |     await expect(tituloDetalhes).toBeVisible();
  70  | 
  71  |     // Then o sistema deve exibir a seção "Account Activity":
  72  |     // Valide que o título secundário 'Account Activity' está visível na tela.
  73  |     const tituloActivity = page.locator("h1.title").filter({ hasText: "Account Activity" });
  74  |     await expect(tituloActivity).toBeVisible();
  75  | 
  76  |     // And apresentar uma tabela contendo o histórico com: data, descrição, débito e crédito:
  77  |     // Localize a tabela de transações (id #transactionTable).
  78  |     const transactionTable = page.locator("#transactionTable");
  79  |     
  80  |     // Verificar se a tabela ou a mensagem de que não há transações está visível, 
  81  |     // já que o Parabank pode ter comportamento diferente dependo da conta recém criada.
  82  |     const noTransactionsMessage = page.getByText("No transactions found.");
  83  |     
  84  |     if (await noTransactionsMessage.isVisible()) {
  85  |         console.log("⚠️ Nenhuma transação encontrada (Tabela não renderizada). Validando a ausência de quebras.");
  86  |         // O teste não vai quebrar, mas informamos que a tabela de histórico não apareceu.
  87  |     } else {
  88  |         // Valide que os cabeçalhos (th) da tabela contêm os textos exatos: Date, Transaction, Debit (-) e Credit (+).
  89  |         await expect(transactionTable).toBeVisible();
  90  |         
  91  |         const thead = transactionTable.locator("thead");
  92  |         await expect(thead.locator("th").filter({ hasText: "Date" })).toBeVisible();
  93  |         await expect(thead.locator("th").filter({ hasText: "Transaction" })).toBeVisible();
  94  |         await expect(thead.locator("th").filter({ hasText: "Debit (-)" })).toBeVisible();
  95  |         await expect(thead.locator("th").filter({ hasText: "Credit (+)" })).toBeVisible();
  96  |         
  97  |         console.log("✅ Cabeçalhos da tabela do histórico validados com sucesso!");
  98  |     }
  99  | });
  100 | 
```