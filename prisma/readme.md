# `@monoplayground/db`

## Overview

A database abstraction layer. Uses prisma as the ORM.

## Usage

The base package exports a `@prisma/client` instance. [Docs:](https://www.prisma.io/docs/orm/prisma-client)

```typescript
import { prismaClient } from '@monoplayground/db';

prismaClient.model.findUnique({
  where: {
    '<ID>',
  }
});

```

## Models

Also base models were created for convenience, these are exported from `@monoplayground/db/models`.

Usage:

```typescript
import { getUserByEmail } from '@monoplayground/db/models/user';

const user = await getUserByEmail('<EMAIL>');
```
