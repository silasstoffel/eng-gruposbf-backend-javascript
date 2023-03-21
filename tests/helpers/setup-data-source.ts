import Container from "typedi";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/shared/infra/database/typeorm/data-source";

export const initializeDataSource = async (): Promise<DataSource> => {
    // setup datasource (typeorm) for test
    // @see: https://github.com/typeorm/typeorm/issues/9109
    const dataSource = AppDataSource;

    await dataSource.initialize();
    Container.set(DataSource, dataSource);

    return dataSource;
};
