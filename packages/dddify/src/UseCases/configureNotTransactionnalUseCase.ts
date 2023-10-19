import {
  configureUseCaseCreator,
  WithUnitOfWork,
} from "./configureUseCaseCreator";

export const createWithUowWithoutTransactions =
  <Uow>(uow: Uow): WithUnitOfWork<Uow> =>
  (cb) =>
    cb(uow);

export const configureNotTransactionnalUseCaseCreator = <Uow>(uow: Uow) =>
  configureUseCaseCreator(createWithUowWithoutTransactions(uow));
