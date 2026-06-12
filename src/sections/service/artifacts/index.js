import SerpArtifact from './SerpArtifact.jsx';
import FeedArtifact from './FeedArtifact.jsx';
import FeedGridArtifact from './FeedGridArtifact.jsx';
import WireframeArtifact from './WireframeArtifact.jsx';
import PipelineArtifact from './PipelineArtifact.jsx';
import ConversationArtifact from './ConversationArtifact.jsx';
import RankArtifact from './RankArtifact.jsx';
import InboxArtifact from './InboxArtifact.jsx';
import TypographyArtifact from './TypographyArtifact.jsx';
import DashboardArtifact from './DashboardArtifact.jsx';
import DefaultArtifact from './DefaultArtifact.jsx';

const REGISTRY = {
  serp: SerpArtifact,
  feed: FeedArtifact,
  'feed-grid': FeedGridArtifact,
  wireframe: WireframeArtifact,
  pipeline: PipelineArtifact,
  conversation: ConversationArtifact,
  rank: RankArtifact,
  inbox: InboxArtifact,
  typography: TypographyArtifact,
  dashboard: DashboardArtifact,
};

export function getArtifact(key) {
  return REGISTRY[key] || DefaultArtifact;
}
