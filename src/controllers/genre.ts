import { Response, Request } from "express";
import { fetchGenres, fetchOne } from "../services/genres";
import { genreModel } from "../models/genreModel";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export async function getGenres(
  req: Request,
  res: Response
): Promise<Response> {
  //
  try {
    // find all genres in database
    const genre = await genreModel.find({});

    // if genre returns empty, fetch genre from deezer api using axios
    if (genre.length === 0) {
      const allGenres = await fetchGenres();
      const data = await genreModel.insertMany(allGenres.data.data);
      responseStatus.setSuccess(200, "successful", data);
      return responseStatus.send(res);
    }

    // return successful response
    responseStatus.setSuccess(200, "successful", genre);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, "error");
    return responseStatus.send(res);
  }
}

export async function getOneGenre(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    // get deezer genre id (Number) from request parameter
    const { id } = req.params;

    // return error if id is empty
    if (!id) {
      responseStatus.setError(400, "Please provide an Id");
      return responseStatus.send(res);
    }
    // check if id is a number, if not return error
    if (!Number.parseInt(id, 10)) {
      responseStatus.setError(500, "error");
      return responseStatus.send(res);
    }

    // find genre by the id in database
    const newId = Number.parseInt(id, 10);
    const data = await genreModel.findOne({ id: newId });

    // if data returns empty, resturn 404 error
    if (!data) {
      const oneGenre = await fetchOne(newId);
      responseStatus.setSuccess(200, "successful", oneGenre);
      return responseStatus.send(res);
    }

    // if data, return return success
    responseStatus.setSuccess(200, "successful", data);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, "error");
    return responseStatus.send(res);
  }
}
