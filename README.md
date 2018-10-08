# Acrosure JavaScript SDK

![Acrosure](./static/Acrosure-color.png)

JavaScript SDK for connecting with Acrosure Insurance Gateway

## Installation

Install via npm:

`npm install --save @acrosure/js-sdk`

Or if you're using [yarn](https://yarnpkg.com/en/):

`yarn add @acrosure/js-sdk`

## Getting Started

Import AcrosureClient into your project.

```javascript
import AcrosureClient from '@acrosure/js-sdk'

// es5
const AcrosureClient = require('@acrosure/js-sdk')
```

Instantiate with an API key from [Acrosure Dashboard](https://dashboard.acrosure.com).

_If you're using this on client-side, it is highly recommended to use the public key instead of private key because of security concerns._

```javascript
const acrosureClient = new AcrosureClient({
  token: '<your_api_key>'
})
```

## Basic Usage

AcrosureClient provides several objects such as `application`, `product`, etc. and associated APIs.

Any data will be inside an response object with `data` key, along with meta data, such as:

```json
{
  "data": { ... },
  "status": "ok",
  ...
}
```

### Application

#### Get

Get application with specified id.

```javascript
const application = acrosureClient.application.get('<application_id>')
```

#### Create

Create an application.

```javascript
const createdApplication = await acrosureClient.application.create({
  productId: '<product_id>', // required
  basic_data: {},
  package_options: {},
  additional_data: {},
  package_code: '<package_code>',
  attachments: []
})
```

#### Update

Update an application.

```javascript
const updatedApplication = await acrosureClient.application.update({
  application_id: '<application_id>', // required
  basic_data: {},
  package_options: {},
  additional_data: {},
  package_code: '<package_code>',
  attachments: []
})
```

#### Get packages

Get current application available packages.

```javascript
const packages = await acrosureClient.application.getPackages(
  '<application_id>'
)
```

#### Select package

Select package for current application.

```javascript
const updatedApplication = await acrosureClient.application.selectPackage({
  application_id: '<application_id>',
  package_code: '<package_code>'
})
```

#### Get package

Get selected package of current application.

```javascript
const currentPackage = await acrosureClient.application.getPackage(
  '<application_id>'
)
```

#### Redirect to payment page

Redirect user to 2C2P payment page (Browser only).

```javascript
await acrosureClient.application.redirectToPayment({
  application_id: '<application_id>',
  frontend_url: '<redirect_url>'
})
```

#### Submit

Submit current application.

```javascript
const submittedApplication = await acrosureClient.application.submit(
  '<application_id>'
)
```

#### Confirm

Confirm current application.

_This function needs secret API key._

```javascript
const confirmedApplication = await acrosureClient.application.confirm(
  '<application_id>'
)
```

#### List

List your applications (with or without query).

```javascript
const applications = await acrosureClient.application.list(query)
```

### Product

#### Get

Get product with specified id.

```javascript
const product = await acrosureClient.product.get('<product_id>')
```

#### List

List your products (with or without query).

```javascript
const products = await acrosureClient.product.list(query)
```

### Policy

#### Get

Get policy with specified id.

```javascript
const policy = await acrosureClient.policy.get('<policy_id>')
```

#### List

List your policies (with or without query).

```javascript
const policies = await acrosureClient.policy.list(query)
```

### Data

#### Get

Get values for a handler (with or without dependencies, please refer to Acrosure API Document).

```javascript
// Without dependencies
const values = await acrosureClient.data.get({
  handler: '<some_handler>'
})

// With dependencies
const values = await acrosureClient.data.get({
  handler: '<some_handler>',
  dependencies: ['<dependency_1>', '<dependency_2>']
})
```

### Team

#### Get info

Get current team information.

```javascript
const teamInfo = await acrosureClient.team.getInfo()
```

### Other functionality

#### Verify webhook signature

Verify webhook signature by specify signature and raw data string. (Only Node.js environment)

```javascript
const isSignatureValid = acrosureClient.verifyWebhook(
  '<signature>',
  '<raw_data>'
)
```

## Advanced Usage

Please refer to [this document](https://acrosure.github.io/acrosure-js-sdk/AcrosureClient.html) for AcrosureClient usage.

And refer to [Acrosure API Document](https://docs.acrosure.com/docs/api-overall.html) for more details on Acrosure API.

## Associated Acrosure API endpoints

### Application

```
/applications/get
/applications/list
/applications/create
/applications/update
/applications/get-packages
/applications/get-package
/applications/select-package
/applications/submit
/applications/confirm
/applications/get-hash
```

### Product

```
/products/get
/products/list
```

### Policy

```
/policies/get
/policies/list
```

### Data

```
/data/get
```

### Team

```
/teams/get-info
```
