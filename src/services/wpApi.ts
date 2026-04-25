/**
 * Unified WordPress API Client
 *
 * Wraps both AJAX and REST adapters to provide a single interface
 * for calling WordPress endpoints. Can toggle between AJAX (legacy)
 * and REST (future) via USE_REST_API flag.
 */

import { ajaxClient } from './ajaxClient';
import { restClient } from './restClient';

// Start with AJAX, eventually migrate endpoints to REST
const USE_REST_API = false;

interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correct?: string;
}

interface QuizSubmission {
  quiz_id: string;
  answers: Record<string, string>;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ApplyContent {
  id: string;
  content_id: string;
  content: string;
  created_at: string;
}

interface CorrectionDetails {
  id: string;
  submission_id: string;
  feedback: string;
  score: number;
  corrections: any[];
}

interface ComponentPreview {
  name: string;
  component: string;
  props: Record<string, any>;
  preview_html: string;
}

interface ComponentUsage {
  component: string;
  used_in: string[];
  total_uses: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar_urls?: Record<string, string>;
  roles?: string[];
}

class WordPressAPI {
  /**
   * Get current authenticated user
   * Uses WordPress AJAX handler tls_get_current_user
   * This properly handles session cookies via AJAX
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      // Use AJAX handler which better supports session cookie passing
      return await ajaxClient.call<User>('tls_get_current_user', {});
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  }

  /**
   * Component Preview - Get component markup preview
   * AJAX: tls_ds_get_component_preview
   */
  async getComponentPreview(componentName: string): Promise<ComponentPreview> {
    if (USE_REST_API) {
      return restClient.get(`/tls-theme/v1/components/${componentName}/preview`);
    } else {
      return ajaxClient.call('tls_ds_get_component_preview', {
        component_name: componentName,
      });
    }
  }

  /**
   * Component Usage - Get where component is used
   * AJAX: tls_ds_get_component_usage
   */
  async getComponentUsage(componentName: string): Promise<ComponentUsage> {
    if (USE_REST_API) {
      return restClient.get(`/tls-theme/v1/components/${componentName}/usage`);
    } else {
      return ajaxClient.call('tls_ds_get_component_usage', {
        component_name: componentName,
      });
    }
  }

  /**
   * Save Quiz Answer - Store single quiz question answer
   * AJAX: tls_save_quiz_answer
   */
  async saveQuizAnswer(
    quizId: string,
    questionId: string,
    answer: any
  ): Promise<any> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/quiz/answer', {
        quiz_id: quizId,
        question_id: questionId,
        answer,
      });
    } else {
      return ajaxClient.call('tls_save_quiz_answer', {
        quiz_id: quizId,
        question_id: questionId,
        answer: typeof answer === 'string' ? answer : JSON.stringify(answer),
      });
    }
  }

  /**
   * Submit Quiz - Submit complete quiz with all answers
   * AJAX: tls_submit_quiz
   */
  async submitQuiz(submission: QuizSubmission): Promise<any> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/quiz/submit', submission);
    } else {
      return ajaxClient.call('tls_submit_quiz', {
        quiz_id: submission.quiz_id,
        answers: JSON.stringify(submission.answers),
      });
    }
  }

  /**
   * Save Apply Content - Save application/implementation content
   * AJAX: tls_save_apply_content
   */
  async saveApplyContent(contentId: string, content: string): Promise<ApplyContent> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/apply/save', {
        content_id: contentId,
        content,
      });
    } else {
      return ajaxClient.call('tls_save_apply_content', {
        content_id: contentId,
        content,
      });
    }
  }

  /**
   * Upload Apply Document - Upload file for application
   * AJAX: tls_upload_apply_document
   * Note: Requires FormData handling - not implemented yet
   */
  async uploadApplyDocument(contentId: string, file: File): Promise<any> {
    if (USE_REST_API) {
      const formData = new FormData();
      formData.append('content_id', contentId);
      formData.append('document', file);
      return restClient.post('/tls-theme/v1/apply/upload', formData);
    } else {
      // AJAX file upload requires special handling with FormData
      // TODO: Implement FormData serialization in ajaxClient
      throw new Error('File upload via AJAX not yet implemented');
    }
  }

  /**
   * Remove Apply Document - Delete uploaded application document
   * AJAX: tls_remove_apply_document
   */
  async removeApplyDocument(contentId: string, documentId: string): Promise<any> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/apply/document/remove', {
        content_id: contentId,
        document_id: documentId,
      });
    } else {
      return ajaxClient.call('tls_remove_apply_document', {
        content_id: contentId,
        document_id: documentId,
      });
    }
  }

  /**
   * Submit Application - Submit complete application/implementation
   * AJAX: tls_submit_apply
   */
  async submitApplication(contentId: string): Promise<any> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/apply/submit', {
        content_id: contentId,
      });
    } else {
      return ajaxClient.call('tls_submit_apply', {
        content_id: contentId,
      });
    }
  }

  /**
   * Save Journal Entry - Create or update journal reflection entry
   * AJAX: tls_journal_save_new_entry
   */
  async saveJournalEntry(title: string, content: string): Promise<JournalEntry> {
    if (USE_REST_API) {
      return restClient.post('/tls-theme/v1/journal/save', { title, content });
    } else {
      return ajaxClient.call('tls_journal_save_new_entry', {
        title,
        content,
      });
    }
  }

  /**
   * Get Journal Entry - Fetch single journal entry
   * AJAX: tls_get_journal_entry
   */
  async getJournalEntry(entryId: string): Promise<JournalEntry> {
    if (USE_REST_API) {
      return restClient.get(`/tls-theme/v1/journal/${entryId}`);
    } else {
      return ajaxClient.call('tls_get_journal_entry', {
        entry_id: entryId,
      });
    }
  }

  /**
   * Get Correction Details - Fetch detailed feedback on submission
   * AJAX: tls_get_correction_details
   */
  async getCorrectionDetails(submissionId: string): Promise<CorrectionDetails> {
    if (USE_REST_API) {
      return restClient.get(`/tls-theme/v1/correction/${submissionId}`);
    } else {
      return ajaxClient.call('tls_get_correction_details', {
        submission_id: submissionId,
      });
    }
  }

  /**
   * Scan Components - Discovery/introspection of available components
   * AJAX: tls_ds_scan_components
   */
  async scanComponents(): Promise<any[]> {
    if (USE_REST_API) {
      return restClient.get('/tls-theme/v1/components/scan');
    } else {
      return ajaxClient.call('tls_ds_scan_components', {});
    }
  }

  /**
   * Complete Learning Item - Mark item as completed
   * AJAX: tls_complete_learning_item
   */
  async completeItem(itemId: string): Promise<any> {
    if (USE_REST_API) {
      return restClient.post(`/tls-theme/v1/items/${itemId}/complete`, {});
    } else {
      return ajaxClient.call('tls_complete_learning_item', {
        item_id: itemId,
      });
    }
  }

  /**
   * Check Item Completed - Check if item is marked as completed
   * AJAX: tls_check_item_completed
   */
  async isItemCompleted(itemId: string): Promise<boolean> {
    if (USE_REST_API) {
      const result = await restClient.get(`/tls-theme/v1/items/${itemId}/completed`);
      return result.completed || false;
    } else {
      const result = await ajaxClient.call('tls_check_item_completed', {
        item_id: itemId,
      });
      return result.completed || false;
    }
  }
}

export const wpApi = new WordPressAPI();
export type { User, JournalEntry, ApplyContent, CorrectionDetails, QuizSubmission };
