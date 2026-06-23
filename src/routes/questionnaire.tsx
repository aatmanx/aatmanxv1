import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { BusinessInfoForm } from "@/components/questionnaire/BusinessInfoForm";
import { CategorySelect } from "@/components/questionnaire/CategorySelect";
import { isQuestionAnswered, QuestionRenderer } from "@/components/questionnaire/QuestionRenderer";
import { QuestionnaireFooter } from "@/components/questionnaire/QuestionnaireFooter";
import { QuestionnaireShell } from "@/components/questionnaire/QuestionnaireShell";
import { getQuestionnaireForCategory, getProgressPercent } from "@/lib/questionnaire/categories";
import { BUSINESS_CATEGORIES } from "@/lib/questionnaire/types";
import type { OnboardingState, QuestionnaireAnswers } from "@/lib/questionnaire/types";
import {
  createInitialState,
  loadState,
  saveState,
  setupLeaveGuard,
  validateBusinessProfile,
} from "@/lib/questionnaire/storage";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "Website questionnaire — aatman" },
      { name: "description", content: "Answer a structured intake so aatman can generate your business website." },
    ],
  }),
  component: QuestionnairePage,
});

function QuestionnairePage() {
  const navigate = useNavigate();
  const [state, setState] = useState<OnboardingState | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = loadState();
    setState(existing ?? createInitialState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!state) return;
    saveState(state);
  }, [state]);

  useEffect(() => setupLeaveGuard(Boolean(state)), [state]);

  const categoryConfig = useMemo(() => {
    if (!state?.businessProfile.category) return null;
    return getQuestionnaireForCategory(state.businessProfile.category);
  }, [state?.businessProfile.category]);

  const totalSteps = 2 + (categoryConfig?.questions.length ?? 8);
  const progressPercent = state
    ? getProgressPercent(state.phase, state.stepIndex, categoryConfig?.questions.length ?? 8)
    : 0;

  const currentQuestion = state?.phase === "category-questions" ? categoryConfig?.questions[state.stepIndex] : null;

  const updateState = useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    const cat = BUSINESS_CATEGORIES.find((c) => c.id === categoryId);
    updateState({
      businessProfile: { ...state!.businessProfile, category: categoryId },
      phase: "business-info",
    });
  };

  const handleBusinessInfoNext = () => {
    const profile = state!.businessProfile;
    const validationErrors = validateBusinessProfile(profile);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    updateState({ phase: "category-questions", stepIndex: 0, featureTimelineStep: 0 });
  };

  const handleAnswerChange = (key: string, value: unknown) => {
    updateState({
      questionnaireAnswers: { ...state!.questionnaireAnswers, [key]: value } as QuestionnaireAnswers,
    });
  };

  const canProceed = useMemo(() => {
    if (!state) return false;
    if (state.phase === "category") return Boolean(state.businessProfile.category);
    if (state.phase === "business-info") return Object.keys(validateBusinessProfile(state.businessProfile)).length === 0;
    if (currentQuestion) return isQuestionAnswered(currentQuestion, state.questionnaireAnswers);
    return false;
  }, [state, currentQuestion]);

  const goNext = () => {
    if (!state) return;
    if (state.phase === "business-info") {
      handleBusinessInfoNext();
      return;
    }
    if (state.phase === "category-questions" && categoryConfig) {
      if (currentQuestion?.type === "feature-timeline") return;
      const isLast = state.stepIndex >= categoryConfig.questions.length - 1;
      if (isLast) {
        navigate({ to: "/questionnaire/complete" });
        return;
      }
      updateState({ stepIndex: state.stepIndex + 1, featureTimelineStep: 0 });
    }
  };

  const goBack = () => {
    if (!state) return;
    if (state.phase === "business-info") {
      updateState({ phase: "category" });
      return;
    }
    if (state.phase === "category-questions") {
      if (state.stepIndex === 0) {
        updateState({ phase: "business-info" });
        return;
      }
      updateState({ stepIndex: state.stepIndex - 1, featureTimelineStep: 0 });
    }
  };

  const handleFeatureTimelineFinish = () => {
    navigate({ to: "/questionnaire/complete" });
  };

  const currentStepNumber = useMemo(() => {
    if (!state) return 1;
    if (state.phase === "category") return 1;
    if (state.phase === "business-info") return 2;
    return 3 + state.stepIndex;
  }, [state]);

  const stepLabel = useMemo(() => {
    if (!state) return "Loading...";
    if (state.phase === "category") return "Select category";
    if (state.phase === "business-info") return "Business information";
    return `Question ${state.stepIndex + 1} of ${categoryConfig?.questions.length ?? 8}`;
  }, [state, categoryConfig]);

  if (!ready || !state) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isFeatureTimeline = currentQuestion?.type === "feature-timeline";
  const isLastQuestion = state.phase === "category-questions" && categoryConfig && state.stepIndex === categoryConfig.questions.length - 1;
  const showTopNav = state.phase !== "category" && !isFeatureTimeline;

  return (
    <QuestionnaireShell
      progressPercent={progressPercent}
      stepLabel={stepLabel}
      stepKey={currentQuestion?.key}
      totalSteps={totalSteps}
      currentStep={currentStepNumber}
      showNav={showTopNav}
      onBack={goBack}
      onNext={goNext}
      backDisabled={state.phase === "category"}
      nextDisabled={!canProceed}
      footer={
        isLastQuestion && !isFeatureTimeline ? (
          <QuestionnaireFooter
            onBack={goBack}
            onNext={goNext}
            nextDisabled={!canProceed}
            isLast
            error={null}
          />
        ) : null
      }
    >
      {state.phase === "category" && (
        <CategorySelect categories={BUSINESS_CATEGORIES} selected={state.businessProfile.category} onSelect={handleCategorySelect} />
      )}

      {state.phase === "business-info" && (
        <BusinessInfoForm profile={state.businessProfile} errors={errors} onChange={(updates) => updateState({ businessProfile: { ...state.businessProfile, ...updates } })} />
      )}

      {state.phase === "category-questions" && currentQuestion && (
        <QuestionRenderer
          question={currentQuestion}
          answers={state.questionnaireAnswers}
          featureTimelineStep={state.featureTimelineStep ?? 0}
          onAnswerChange={handleAnswerChange}
          onFeatureTimelineStepChange={(step) => updateState({ featureTimelineStep: step })}
          onFeatureTimelineFinish={handleFeatureTimelineFinish}
        />
      )}
    </QuestionnaireShell>
  );
}
