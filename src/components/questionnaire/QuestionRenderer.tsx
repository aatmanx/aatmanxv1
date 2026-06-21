import type { QuestionConfig, QuestionnaireAnswers } from "@/lib/questionnaire/types";
import { MultiSelectExpandable, MultiSelectAll, SingleSelect, emptyMultiSelect } from "./MultiSelectQuestion";
import { DesignPreferencesQuestion, defaultDesignAnswer } from "./DesignPreferencesQuestion";
import { FileUploadSection, emptyFileAssets } from "./FileUploadSection";
import { FeatureTimelineQuestion, emptyFeatureTimeline } from "./FeatureTimelineQuestion";

type Props = {
  question: QuestionConfig;
  answers: QuestionnaireAnswers;
  featureTimelineStep: number;
  onAnswerChange: (key: string, value: unknown) => void;
  onFeatureTimelineStepChange: (step: number) => void;
  onFeatureTimelineFinish: () => void;
};

export function QuestionRenderer({
  question,
  answers,
  featureTimelineStep,
  onAnswerChange,
  onFeatureTimelineStepChange,
  onFeatureTimelineFinish,
}: Props) {
  switch (question.type) {
    case "multi-select-expandable": {
      const value = (answers[question.key] as ReturnType<typeof emptyMultiSelect>) ?? emptyMultiSelect();
      return (
        <MultiSelectExpandable
          title={question.title}
          subtitle={question.subtitle}
          initialOptions={question.initialOptions ?? []}
          allOptions={question.allOptions ?? []}
          value={value}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );
    }

    case "multi-select-all": {
      const value = (answers[question.key] as ReturnType<typeof emptyMultiSelect>) ?? emptyMultiSelect();
      return (
        <MultiSelectAll
          title={question.title}
          subtitle={question.subtitle}
          options={question.allOptions ?? []}
          value={value}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );
    }

    case "single-select": {
      const value = (answers[question.key] as string) ?? "";
      return (
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
          <SingleSelect
            title={question.title}
            subtitle={question.subtitle}
            options={question.allOptions ?? []}
            value={value}
            onChange={(v) => onAnswerChange(question.key, v)}
          />
        </div>
      );
    }

    case "composite-objective": {
      const composite = (answers[question.key] as Record<string, unknown>) ?? {};
      return (
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
          <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{question.title}</h1>
          <div className="mt-10 space-y-10">
            {question.sections?.map((section) => {
              if (section.type === "single") {
                return (
                  <SingleSelect
                    key={section.key}
                    title={section.title}
                    options={section.options ?? []}
                    value={(composite[section.key] as string) ?? ""}
                    onChange={(v) => onAnswerChange(question.key, { ...composite, [section.key]: v })}
                  />
                );
              }
              return (
                <MultiSelectExpandable
                  key={section.key}
                  title={section.title}
                  initialOptions={section.initialOptions ?? []}
                  allOptions={section.allOptions ?? []}
                  value={(composite[section.key] as ReturnType<typeof emptyMultiSelect>) ?? emptyMultiSelect()}
                  onChange={(v) => onAnswerChange(question.key, { ...composite, [section.key]: v })}
                />
              );
            })}
          </div>
        </div>
      );
    }

    case "design-preferences": {
      const value = (answers[question.key] as ReturnType<typeof defaultDesignAnswer>) ?? defaultDesignAnswer();
      return (
        <DesignPreferencesQuestion
          title={question.title}
          initialStyleOptions={question.initialOptions ?? []}
          allStyleOptions={question.allOptions ?? []}
          value={value}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );
    }

    case "file-upload": {
      const value = (answers[question.key] as Record<string, unknown[]>) ?? emptyFileAssets();
      return (
        <FileUploadSection
          title={question.title}
          categories={question.uploadCategories ?? []}
          value={value as Record<string, Array<{ id: string; category: string; name: string; type: string; size: number; local_key?: string; preview?: string }>>}
          onChange={(v) => onAnswerChange(question.key, v)}
        />
      );
    }

    case "feature-timeline": {
      const value = (answers[question.key] as ReturnType<typeof emptyFeatureTimeline>) ?? emptyFeatureTimeline();
      return (
        <FeatureTimelineQuestion
          title={question.title}
          steps={question.timelineSteps ?? []}
          currentStep={featureTimelineStep}
          value={value}
          onChange={(v) => onAnswerChange(question.key, v)}
          onStepChange={onFeatureTimelineStepChange}
          onFinish={onFeatureTimelineFinish}
        />
      );
    }

    default:
      return null;
  }
}

export function isQuestionAnswered(question: QuestionConfig, answers: QuestionnaireAnswers): boolean {
  const val = answers[question.key];
  if (val == null) return false;

  switch (question.type) {
    case "multi-select-expandable":
    case "multi-select-all": {
      const m = val as { selected: string[]; custom: string[] };
      return (m.selected?.length ?? 0) + (m.custom?.length ?? 0) > 0;
    }
    case "single-select":
      return Boolean(val);
    case "composite-objective": {
      const c = val as Record<string, unknown>;
      return question.sections?.every((s) => {
        const v = c[s.key];
        if (s.type === "single") return Boolean(v);
        const m = v as { selected: string[]; custom: string[] };
        return (m?.selected?.length ?? 0) + (m?.custom?.length ?? 0) > 0;
      }) ?? false;
    }
    case "design-preferences": {
      const d = val as { animation: string; visual_style: { selected: string[] } };
      return Boolean(d.animation) && (d.visual_style?.selected?.length ?? 0) > 0;
    }
    case "file-upload":
      return true;
    case "feature-timeline": {
      const steps = question.timelineSteps ?? [];
      const ft = val as Record<string, string[]>;
      return steps.every((s) => (ft[s.key]?.length ?? 0) > 0);
    }
    default:
      return true;
  }
}
