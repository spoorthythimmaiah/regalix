from .activity_feed import ActivityFeedApi
from .announcement_widget import AnnouncementWidgetApi
from .audience import AudienceCompanyApi, AudienceEmployeeApi
from .box import BoxApi
from .bulletin_board import BulletinBoardApi
from .cta import CTAFormApi
from .checklist import (
    ChecklistApi,
    ChecklistItemApi,
    ChecklistSectionApi,
    ChecklistSuggestionApi
)
from .dashboard import DashboardApi
from .dashboard_report import DashboardReportApi
from .document_parser import DocumentParserApi
from .download import DownloadApi
from .embed_playlist import EmbedPlayListApi
from .faq import FAQGroupApi, FAQSectionApi, FAQApi
from .feedback import FeedbackApi, MessageApi, RatingApi
from .homepage_banner import HomepageBannerApi
from .icon import IconApi
from .journey import JourneyApi, JourneyTagsAndOptionsApi
from .journey_tree import JourneyTreeApi
from .new_reports import NewReportsApi
from .playlist import PlaylistApi
from .pathfinder import (
    AnswerApi,
    OptionApi,
    PathApi,
    QuestionApi,
    SuggestionsApi,
    SuggestionGroupsApi
)
from .pathfinder_reports import PathReportsApi
from .product_tree import ProductTreeApi
from .reports import (
    ReportsApi,
    ReportsDataApi,
    ReportsGraphApi,
    ViewerDetailsApi
)
from .resource import (
    ResourceApi,
    RTEResourceApi,
    SectionResourceApi
)
from .sample_exchange import SampleExchangeApi
from .section import SectionApi
from .sitemap import SiteMapApi
from .slide import SlideApi
from .social_share import SocialShareApi
from .tag import TagApi
from .usher import UsherApi
from .user import UserApi, LinkedinUserApi
from .viewer_activity import ViewerActivityApi
from .walkthrough import WalkthroughApi

from sharedemos.apps.pitch.api import (
    PitchApi,
    PitchSectionApi,
    PitchRecordingApi,
    PitchResourceApi,
    PitchActivityApi,
    PitchSectionActivityApi,
    PitchRecordingActivityApi,
    PitchResultApi,
    PitchUserActivityApi,
)
from sharedemos.apps.quiz.api import (
    QuizApi,
    QuizOptionApi,
    QuizQuestionApi,
    QuizReportsApi
)
from sharedemos.apps.recommendations.api import RecommendationApi

from sharedemos.apps.repository_manager.api import (
    RepositoryConnectorApi,
    RepositoryListenerApi
)


def configure_api(api_manager):
    """Configure API url endpoints."""
    api_manager.add_resource(AudienceCompanyApi,
                             '/api/audience-company',
                             '/api/audience-company/',
                             '/api/audience-company/<company_id>')
    api_manager.add_resource(
        AudienceEmployeeApi,
        '/api/audience-employee/<int:company_id>',
        '/api/audience-employee/<int:company_id>/',
        '/api/audience-employee/<int:company_id>/<int:user_id>',
        '/api/audience-employee/<int:company_id>/<int:user_id>/')
    api_manager.add_resource(ActivityFeedApi, '/api/activity-feed',
                             '/api/activity-feed/')
    api_manager.add_resource(AnnouncementWidgetApi,
                             '/api/announcement-widget',
                             '/api/announcement-widget/')
    api_manager.add_resource(AnswerApi, '/api/answer/<int:answer_id>')

    api_manager.add_resource(BoxApi, '/api/box')
    api_manager.add_resource(BulletinBoardApi, '/api/bulletin-board',
                             '/api/bulletin-board/',
                             '/api/bulletin-board/<int:id>')

    api_manager.add_resource(CTAFormApi, '/api/cta',
                             '/api/cta/', '/api/cta/<int:id>')
    api_manager.add_resource(ChecklistApi, '/api/checklist', '/api/checklist/',
                             '/api/checklist/<string:slug>')
    api_manager.add_resource(ChecklistSectionApi, '/api/checklist-section',
                             '/api/checklist-section/',
                             '/api/checklist-section/<int:section_id>')
    api_manager.add_resource(ChecklistItemApi, '/api/checklist-item',
                             '/api/checklist-item/',
                             '/api/checklist-item/<int:item_id>')
    api_manager.add_resource(ChecklistSuggestionApi,
                             '/api/checklist-suggestion',
                             '/api/checklist-suggestion/',
                             '/api/checklist-suggestion/<int:suggestion_id>')

    api_manager.add_resource(DashboardApi, '/api/dashboard', '/api/dashboard/')
    api_manager.add_resource(DashboardReportApi, '/api/reports/library',
                             '/api/reports/library/')
    api_manager.add_resource(DocumentParserApi,
                             '/api/document-parser',
                             '/api/document-parser/',
                             '/api/document-parser/<string:filename>')
    api_manager.add_resource(DownloadApi, '/api/download', '/api/download/')

    api_manager.add_resource(EmbedPlayListApi, '/api/embed/<string:slug>')

    api_manager.add_resource(FAQApi, '/api/faq-qna', '/api/faq-qna/',
                             '/api/faq-qna/<int:id>')
    api_manager.add_resource(FAQGroupApi, '/api/faq-group', '/api/faq-group/',
                             '/api/faq-group/<string:slug>')
    api_manager.add_resource(FAQSectionApi, '/api/faq-section',
                             '/api/faq-section/',
                             '/api/faq-section/<int:id>')
    api_manager.add_resource(HomepageBannerApi, '/api/homepage-banner',
                             '/api/homepage-banner/',
                             '/api/homepage-banner/<int:id>')
    api_manager.add_resource(IconApi, '/api/icon', '/api/icon/<int:id>')
    api_manager.add_resource(JourneyApi, '/api/journey', '/api/journey/',
                             '/api/journey/<string:slug>',
                             '/api/journey/<string:slug>/')
    api_manager.add_resource(JourneyTagsAndOptionsApi,
                             '/api/journey/tags-and-options',
                             '/api/journey/tags-and-options/')
    api_manager.add_resource(JourneyTreeApi, '/api/journey-tree',
                             '/api/journey-tree/')
    api_manager.add_resource(LinkedinUserApi, '/api/user/linkedin')

    api_manager.add_resource(MessageApi, '/api/message')

    api_manager.add_resource(NewReportsApi, '/api/new_reports',
                             '/api/new_reports/')

    api_manager.add_resource(OptionApi,
                             '/api/option',
                             '/api/option/<int:option_id>',
                             '/api/option/<int:option_id>/',
                             '/api/option/<int:option_id>/suggestions')

    api_manager.add_resource(PathApi, '/api/path', '/api/path/<string:slug>')
    api_manager.add_resource(PathReportsApi, '/api/reports/path')
    api_manager.add_resource(PlaylistApi, '/api/playlist', '/api/playlist/',
                             '/api/playlist/<int:playlist_id>')
    api_manager.add_resource(ProductTreeApi,
                             '/api/product-tree',
                             '/api/product-tree/<product_id>',
                             '/api/product-tree/<product_id>/<section_id>')
    api_manager.add_resource(QuestionApi, '/api/question',
                             '/api/question/<int:question_id>')
    api_manager.add_resource(QuizApi, '/api/quiz', '/api/quiz/',
                             '/api/quiz/<string:slug>')
    api_manager.add_resource(QuizOptionApi, '/api/quiz-option',
                             '/api/quiz-option/',
                             '/api/quiz-option/<int:option_id>')
    api_manager.add_resource(QuizQuestionApi, '/api/quiz-question',
                             '/api/quiz-question/',
                             '/api/quiz-question/<int:question_id>')
    api_manager.add_resource(QuizReportsApi, '/api/quiz/reports',
                             '/api/quiz/reports/')

    api_manager.add_resource(RatingApi, '/api/rate-content',
                             '/api/rate-content/'),
    api_manager.add_resource(FeedbackApi, '/api/feedback',
                             '/api/feedback/')
    api_manager.add_resource(
        ReportsApi,
        """/api/reports/demo/<string:product>/
        <string:section>/<string:walkthrough>""",
        """/api/reports/demo/<string:product>/<string:section>
        /<string:walkthrough>/<string:date_range>""",
        """/api/reports/demo/<string:product>/<string:section>
        /<string:walkthrough>/<string:date_range>/<from_date>/<to_date>""")
    api_manager.add_resource(ReportsDataApi, '/api/reports/data',
                             '/api/reports/data/')
    api_manager.add_resource(ReportsGraphApi, '/api/reports/graph',
                             '/api/reports/graph/')
    api_manager.add_resource(ResourceApi, '/api/resource',
                             '/api/resource/<int:id>',
                             '/api/resource/<string:res_path>')
    api_manager.add_resource(RTEResourceApi, '/api/resource/rte-asset',
                             '/api/resource/rte-asset/',
                             '/api/resource/rte-asset/<string:path>')
    api_manager.add_resource(SampleExchangeApi, '/api/sample-exchange',
                             '/api/sample-exchange/',
                             '/api/sample-exchange/<int:id>')
    api_manager.add_resource(SectionApi,
                             '/api/section',
                             '/api/section/',
                             '/api/section/<string:slug>',
                             '/api/section.json',
                             '/api/section/<string:slug>.json')
    api_manager.add_resource(SectionResourceApi,
                             '/api/resource/section-asset-link',
                             '/api/resource/section-asset-link/',
                             '/api/resource/section-asset-link/<int:id>')
    api_manager.add_resource(SiteMapApi, '/api/sitemap', '/api/sitemap/')
    api_manager.add_resource(SlideApi, '/api/slide/<int:order>')
    api_manager.add_resource(SocialShareApi,
                             '/api/social-share', '/api/social-share/')
    api_manager.add_resource(SuggestionsApi,
                             '/api/suggestions/<int:suggestion_id>')
    api_manager.add_resource(SuggestionGroupsApi, '/api/suggestions_groups',
                             '/api/suggestions_groups/<int:group_id>')

    api_manager.add_resource(TagApi, '/api/tags', '/api/tags/',
                             '/api/tags/<search_text>')

    api_manager.add_resource(UsherApi, '/api/usher/', '/api/usher')
    api_manager.add_resource(UserApi, '/api/user', '/api/user/',
                             '/api/user/<int:role_id>')

    api_manager.add_resource(
        ViewerActivityApi,
        '/api/reports/viewer-activity/<string:viewer_id>/<string:category_id>',
        """/api/reports/viewer-activity/<string:viewer_id>
        /<string:category_id>/<string:date_range>""",
        """/api/reports/viewer-activity/<string:viewer_id>/<string:category_id>
        /<string:date_range>/<from_date>/<to_date>""")

    api_manager.add_resource(
        ViewerDetailsApi,
        '/api/reports/viewer',
        '/api/reports/viewer/',
        '/api/reports/viewer/<int:viewer_id>')

    api_manager.add_resource(WalkthroughApi,
                             '/api/walkthrough',
                             '/api/walkthrough/',
                             '/api/walkthrough/<string:slug>',
                             '/api/walkthrough/<string:slug>.json')

    # PitchApp APIs.
    api_manager.add_resource(PitchApi,
                             '/api/pitch',
                             '/api/pitch/<string:uuid>',
                             '/api/pitch/<string:uuid>/<int:version>')

    api_manager.add_resource(PitchSectionApi,
                             '/api/pitch-section',
                             '/api/pitch-section/<string:uuid>')
    api_manager.add_resource(PitchRecordingApi,
                             '/api/pitch-record')
    api_manager.add_resource(PitchResourceApi,
                             '/api/pitch-resource')

    api_manager.add_resource(PitchActivityApi,
                             '/api/pitch-activity',
                             '/api/pitch-activity/<string:uuid>',
                             '/api/pitch-activity/<string:uuid>/<int:version>')
    api_manager.add_resource(PitchSectionActivityApi,
                             '/api/pitch-section-activity')
    api_manager.add_resource(PitchRecordingActivityApi,
                             '/api/pitch-recording-activity')
    api_manager.add_resource(
        PitchUserActivityApi,
        '/api/pitch-user-activity/<string:pitch_uuid>/<string:username>/<int:version>'
    )
    api_manager.add_resource(
        PitchResultApi,
        '/api/pitch-result/<string:compare_uuid>'
    )

    # recommendations api manager
    api_manager.add_resource(RecommendationApi, '/api/recommendations')

    # repository manager api
    api_manager.add_resource(RepositoryConnectorApi,
                             '/api/repository-connector',
                             '/api/repository-connector/',
                             '/api/repository-connector/<string:uuid>')

    api_manager.add_resource(RepositoryListenerApi,
                             '/api/repository-listener',
                             '/api/repository-listener/')
