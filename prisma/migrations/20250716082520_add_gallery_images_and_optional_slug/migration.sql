/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "EventCategory" ADD VALUE 'COURSE';

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "certificateUrl" TEXT,
ADD COLUMN     "courseHighlights" JSONB,
ADD COLUMN     "galleryImages" JSONB,
ADD COLUMN     "keyLearningOutcomes" JSONB,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'English',
ADD COLUMN     "prerequisites" JSONB,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "speakers" JSONB,
ADD COLUMN     "whyChoose" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
