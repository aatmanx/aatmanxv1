import type { QuestionConfig, QuestionnaireAnswers, TeamMember } from "@/lib/questionnaire/types";
import { getEffectiveAnswer } from "@/lib/questionnaire/validation";
import { MultiSelectQuestion, SingleSelectQuestion } from "./SelectQuestions";
import { TextInputQuestion } from "./TextInputQuestion";
import { TextareaQuestion } from "./TextareaQuestion";
import { FileUploadQuestion, RepeatableFieldsQuestion } from "./RepeatableFieldsQuestion";
import { emptyFileAssets } from "@/lib/questionnaire/file-store";

type Props = {
  question: QuestionConfig;
  answers: QuestionnaireAnswers;
  onAnswerChange: (key: string, value: unknown) => void;
  error?: string;
};

export function QuestionRenderer({ question, answers, onAnswerChange, error }: Props) {
  switch (question.type) {
    case "text":
      return (
        <TextInputQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          placeholder={question.placeholder ?? question.example}
          value={(answers[question.key] as string) ?? ""}
          onChange={(v) => onAnswerChange(question.key, v)}
          error={error}
        />
      );

    case "textarea":
      return (
        <TextareaQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          placeholder={question.placeholder}
          example={question.example}
          value={(answers[question.key] as string) ?? ""}
          onChange={(v) => onAnswerChange(question.key, v)}
          error={error}
        />
      );

    case "single-select":
      return (
        <SingleSelectQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          options={question.options ?? []}
          value={(answers[question.key] as string) ?? ""}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );

    case "multi-select":
      return (
        <MultiSelectQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          options={question.options ?? []}
          value={(getEffectiveAnswer(question, answers) as string[]) ?? []}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );

    case "file-upload": {
      const value = (answers[question.key] as Record<string, unknown[]>) ?? emptyFileAssets();
      return (
        <FileUploadQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          categories={question.uploadCategories ?? []}
          value={value as Record<string, Array<{ id: string; category: string; name: string; type: string; size: number; local_key?: string; preview?: string }>>}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );
    }

    case "repeatable":
      return (
        <RepeatableFieldsQuestion
          sectionTitle={question.sectionTitle}
          title={question.title}
          subtitle={question.subtitle}
          fields={question.repeatableFields ?? []}
          value={(answers[question.key] as TeamMember[]) ?? []}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );

    default:
      return null;
  }
}

export { isQuestionAnswered } from "@/lib/questionnaire/validation";
