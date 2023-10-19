export type WithUnitOfWork<UnitOfWork> = <T>(f: (uow: UnitOfWork) => T) => T;

type ConfigureUseCaseCreator = <UnitOfWork>(
  withUow: WithUnitOfWork<UnitOfWork>
) => <Deps, Params, Response>(
  cb: (params: { uow: UnitOfWork; deps: Deps; params: Params }) => Response
) => (deps: Deps) => (params: Params) => Response;

export const configureUseCaseCreator: ConfigureUseCaseCreator =
  (withUow) => (cb) => (deps) => (params) =>
    withUow((uow) => cb({ uow, deps, params }));
