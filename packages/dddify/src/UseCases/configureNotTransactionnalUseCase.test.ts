import { Clock, createCustomClock } from "../ClockAndUuid/Clock";
import { configureNotTransactionnalUseCaseCreator } from "./configureNotTransactionnalUseCase";

type Book = {
  name: string;
  author: string;
};

const dune: Book = { name: "Dune", author: "Frank Herbert" };
const allBooks: Book[] = [dune, {name: "Harry Potter", author: "J.K. Rowling"}];

const myUnitOfWork = {
  repo: {
    getBooks: (search: string): Book[] =>
      allBooks.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      ),
  },
};

const createUseCase = configureNotTransactionnalUseCaseCreator(myUnitOfWork);

type CountBooksDeps = {
  clock: Clock;
};

type CountBooksParams = { search: string };

describe("Configure a useCase creator function, create a use case and call it", () => {
  it("has strong typing constraint, and works correctly", async () => {
    const countBooksUseCase = createUseCase<
      CountBooksDeps,
      CountBooksParams,
      Promise<string>
    >(async ({ uow, deps, params }) => {
      const books = await uow.repo.getBooks(params.search);
      const timestamp = deps.clock.now().toDateString();
      
      return `At ${timestamp}, there was ${
        books.length
      } books which include '${params.search}' in the name`;
    });

    const countBooks = countBooksUseCase({ clock: createCustomClock() });

    expect(await countBooks({ search: "dun" })).toEqual(
      "At 2022-01-01T12:00:00.000Z, there was 1 books which include 'dun' in the name"
    );
  });
});
