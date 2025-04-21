-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "result_answers" DROP CONSTRAINT "result_answers_result_question_id_fkey";

-- DropForeignKey
ALTER TABLE "result_questions" DROP CONSTRAINT "result_questions_result_id_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_participant_id_fkey";

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_questions" ADD CONSTRAINT "result_questions_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_answers" ADD CONSTRAINT "result_answers_result_question_id_fkey" FOREIGN KEY ("result_question_id") REFERENCES "result_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
