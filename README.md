# Acrosure JavaScript SDK

The official Acrosure SDK for JavaScript.

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

### Application

#### Set id

Set application id for later uses.

```javascript
acrosureClient.application.setID('<application_id>')

// ...

const applicationID = acrosureClient.application.id
```

#### Get

Get application with specified id, and set current application id for later uses.

```javascript
const application = acrosureClient.application.get('<application_id>')

// ...

const applicationID = acrosureClient.application.id
```

Get current application.

```javascript
// acrosureClient.application.id needed to be set
const application = await acrosureClient.application.get()
```

#### Create

Create an application.

```javascript
const createdApplication = await acrosureClient.application.create({
  productId: '<product_id>', // required
  basicData: {},
  packageOptions: {},
  additionalData: {},
  packageCode: '<package_code>',
  attachments: []
})
```

#### Update

Update an application.

```javascript
// acrosureClient.application.id needed to be set
const updatedApplication = await acrosureClient.application.update({
  basicData: {},
  packageOptions: {},
  additionalData: {},
  packageCode: '<package_code>',
  attachments: []
})
```

#### Get packages

Get current application available packages.

```javascript
// acrosureClient.application.id needed to be set
const packages = await acrosureClient.application.getPackages()
```

#### Select package

Select package for current application.

```javascript
// acrosureClient.application.id needed to be set
const updatedApplication = await acrosureClient.application.selectPackage({
  packageCode: '<package_code>'
})
```

#### Get package

Get selected package of current application.

```javascript
// acrosureClient.application.id needed to be set
const currentPackage = await acrosureClient.application.getPackage()
```

#### Submit

Submit current application.

```javascript
// acrosureClient.application.id needed to be set
const submittedApplication = await acrosureClient.application.submit()
```

#### Confirm

Confirm current application.

_This function needs secret API key._

```javascript
// acrosureClient.application.id needed to be set
const confirmedApplication = await acrosureClient.application.confirm()
```

#### List

List your applications (with or without query).

```javascript
const applications = await acrosureClient.application.list(query)
```

### Product

#### Set id

Set product id for later uses.

```javascript
acrosureClient.product.setID('<product_id>')

// ...

const productID = acrosureClient.product.id
```

#### Get

Get product with specified id, and set current product id for later uses.

```javascript
const product = acrosureClient.product.get('<product_id>')

// ...

const productID = acrosureClient.product.id
```

Get current product.

```javascript
// acrosureClient.product.id needed to be set
const product = await acrosureClient.product.get()
```

#### List

List your products (with or without query).

```javascript
const products = await acrosureClient.product.list(query)
```

### Policy

#### Set id

Set policy id for later uses.

```javascript
acrosureClient.policy.setID('<policy_id>')

// ...

const policyID = acrosureClient.policy.id
```

#### Get

Get policy with specified id, and set current policy id for later uses.

```javascript
const policy = acrosureClient.policy.get('<policy_id>')

// ...

const policyID = acrosureClient.policy.id
```

Get current policy.

```javascript
// acrosureClient.policy.id needed to be set
const policy = await acrosureClient.policy.get()
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

## Advance Usage

Please refer to [this document](https://) for AcrosureClient usage.

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
