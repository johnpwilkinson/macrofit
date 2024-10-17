-- CreateTable
CREATE TABLE "MacroFitUser" (
    "id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MacroFitUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MFNutrition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "currentWeight" DOUBLE PRECISION NOT NULL,
    "currentBodyFat" DOUBLE PRECISION NOT NULL,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "goalBodyFat" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MFNutrition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MacroFitUser_email_key" ON "MacroFitUser"("email");

-- AddForeignKey
ALTER TABLE "MFNutrition" ADD CONSTRAINT "MFNutrition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MacroFitUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
