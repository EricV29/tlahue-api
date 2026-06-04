import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { categories, imageCategories, images } from "../db/schema.js";
import { eq, sql, and, or, ilike } from "drizzle-orm";

//* GET

// All images
export const getImages = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 12;
    const offset = Number(req.query.offset) || 0;
    const search = req.query.search as string | undefined;

    const result = await db
      .select({
        id: images.id,
        title: images.title,
        description: images.description,
        url: images.url,
        nameCreator: images.nameCreator,
        linkOrigin: images.linkOrigin,
        location: images.location,
        locationLink: images.locationLink,
        captureAt: images.captureAt,
        createdAt: images.createdAt,
        categories: sql<string[]>`array_agg(${categories.name})`,
      })
      .from(images)
      .leftJoin(imageCategories, eq(images.id, imageCategories.imageId))
      .leftJoin(categories, eq(imageCategories.categoryId, categories.id))
      .where(search ? or(ilike(images.title, `%${search}%`)) : undefined)
      .groupBy(images.id)
      .limit(limit)
      .offset(offset);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting images" });
  }
};

// Get images by category
export const getImagesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const limit = Number(req.query.limit) || 12;
    const offset = Number(req.query.offset) || 0;
    const search = req.query.search as string | undefined;

    const result = await db
      .select({
        id: images.id,
        title: images.title,
        description: images.description,
        url: images.url,
        nameCreator: images.nameCreator,
        linkOrigin: images.linkOrigin,
        location: images.location,
        locationLink: images.locationLink,
        captureAt: images.captureAt,
        createdAt: images.createdAt,
        categories: sql<
          string[]
        >`array_agg(DISTINCT ${categories.name}) FILTER (WHERE ${categories.name} IS NOT NULL)`,
      })
      .from(images)
      .innerJoin(imageCategories, eq(images.id, imageCategories.imageId))
      .innerJoin(categories, eq(imageCategories.categoryId, categories.id))
      .where(
        and(
          eq(imageCategories.categoryId, Number(categoryId)),
          search ? or(ilike(images.title, `%${search}%`)) : undefined,
        ),
      )
      .groupBy(images.id)
      .limit(limit)
      .offset(offset);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error getting images by category" });
  }
};

//* POST

// Create images
export const createImage = async (req: Request, res: Response) => {
  try {
    const { categoryIds, captureAt, ...rest } = req.body;

    const imageData = {
      ...rest,
      captureAt: captureAt ? new Date(captureAt) : null,
    };

    // Insertar imagen
    const [newImage] = await db.insert(images).values(imageData).returning();

    // Insertar categorias
    if (categoryIds?.length) {
      await db.insert(imageCategories).values(
        categoryIds.map((categoryId: number) => ({
          imageId: newImage?.id,
          categoryId,
        })),
      );
    }
    res.status(201).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating images" });
  }
};

// Update images
export const updateImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db
      .update(images)
      .set(req.body)
      .where(eq(images.id, Number(id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating images" });
  }
};

// Delete images
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(images).where(eq(images.id, Number(id)));
    res.json({ message: "images deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting images" });
  }
};
