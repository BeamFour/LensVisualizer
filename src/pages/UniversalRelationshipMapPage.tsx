/**
 * Universal Relationship Map page — /relationships/universal
 *
 * Presents every visible patent, inventor, assignee, and curated corporate
 * relationship through Explore, Full map, and Research. The /relationships page remains
 * the focused ego-map workflow, available through explicit detail-card links.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import ClientOnly from "../components/ClientOnly.js";
import PanelErrorBoundary from "../components/errors/PanelErrorBoundary.js";
import StaticPageShell from "../components/layout/StaticPageShell.js";
import PatentDetailCard from "../components/relationshipMap/PatentDetailCard.js";
import UniversalEntityDetailCard from "../components/relationshipMap/UniversalEntityDetailCard.js";
import UniversalRelationshipMap from "../components/relationshipMap/UniversalRelationshipMap.js";
import UniversalMapSearch from "../components/relationshipMap/UniversalMapSearch.js";
import UniversalMapExplore from "../components/relationshipMap/UniversalMapExplore.js";
import UniversalMapResearch from "../components/relationshipMap/UniversalMapResearch.js";
import { layoutUniversalRelationshipGraph } from "../components/relationshipMap/universalLayout.js";
import { mapButton, mapRow } from "../components/relationshipMap/universalMapStyles.js";
import { findUniversalPaths, UNIVERSAL_RELATION_GROUPS } from "../utils/catalog/universalRelationshipQueries.js";
import type { UniversalMapState, UniversalMapView } from "../types/universalMap.js";
import useMediaQuery from "../utils/useMediaQuery.js";
import { ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS } from "../utils/featureFlags.js";
import SEOHead from "../components/SEOHead.js";
import { SITE_NAME, SITE_URL } from "../utils/catalog/lensMetadata.js";
import { buildUniversalRelationshipGraph } from "../utils/catalog/universalRelationshipGraph.js";
import { breadcrumbJsonLd, collectionPageJsonLd } from "../utils/seo/structuredData.js";
import { canonicalPageUrl } from "../utils/seo/siteUrls.js";
import { H1_STYLE } from "../utils/style/pageStyles.js";
import { panelCard } from "../utils/style/styles.js";
import {
  universalMapStateHash,
  universalMapStateFromHash,
  universalMapNodeFromHash,
} from "../utils/state/universalMapUrl.js";

const UNIVERSAL_GRAPH = buildUniversalRelationshipGraph();
const UNIVERSAL_NODE_IDS = new Set(UNIVERSAL_GRAPH.nodes.map((node) => node.id));
const UNIVERSAL_LAYOUT = layoutUniversalRelationshipGraph(UNIVERSAL_GRAPH);
const UNIVERSAL_NEIGHBORHOOD_IDS = new Set(UNIVERSAL_LAYOUT.clusters.map((cluster) => cluster.id));
const MAP_VIEWS: { id: UniversalMapView; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "full", label: "Full map" },
  { id: "research", label: "Research" },
];

export default function UniversalRelationshipMapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mapState = useMemo(
    () => universalMapStateFromHash(mounted ? location.hash : "", UNIVERSAL_NODE_IDS, UNIVERSAL_NEIGHBORHOOD_IDS),
    [mounted, location.hash],
  );
  const selectedNodeId = mapState.nodeId;
  // Disabled views cannot be exposed by a saved fragment; keep the fragment intact for re-enabling.
  const view = ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS ? mapState.view : "full";
  const connectionPaths = useMemo(
    () =>
      ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS && mapState.fromId && mapState.toId
        ? findUniversalPaths(UNIVERSAL_GRAPH, mapState.fromId, mapState.toId, mapState.edgeKinds)
        : [],
    [mapState.fromId, mapState.toId, mapState.edgeKinds],
  );
  const sideDetails = useMediaQuery("(min-width: 1100px)", { ssrDefault: false, clientOnly: true });
  const lastFullSelection = useRef<string | null>(null);
  useEffect(() => {
    if (view === "full") lastFullSelection.current = selectedNodeId;
  }, [view, selectedNodeId]);
  const [focusRequest, setFocusRequest] = useState<{ nodeId: string; requestId: number }>();
  const [viewResetRequest, setViewResetRequest] = useState(0);
  const focusSequence = useRef(0);
  const pendingSelection = useRef<{ hash: string; center: boolean; keyboard: boolean } | undefined>(undefined);
  const handledLocationKey = useRef<string | undefined>(undefined);
  const committedNode = useRef<string | null | undefined>(undefined);
  const detailsHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusDetails = useRef(false);
  const requestNodeFocus = useCallback((nodeId: string) => {
    setFocusRequest({ nodeId, requestId: ++focusSequence.current });
  }, []);

  const updateMap = (patch: Partial<UniversalMapState>, center = false, keyboard = false) => {
    const nodeId = patch.nodeId === undefined ? selectedNodeId : patch.nodeId;
    if (nodeId !== null && !UNIVERSAL_NODE_IDS.has(nodeId)) return;
    const hash = universalMapStateHash(location.hash, patch);
    if (hash !== location.hash) {
      pendingSelection.current = { hash, center, keyboard };
      void navigate({ pathname: location.pathname, search: location.search, hash }, { preventScrollReset: true });
    } else {
      pendingSelection.current = undefined;
      focusDetails.current = keyboard;
      if (center && nodeId) requestNodeFocus(nodeId);
    }
  };
  const selectNode = (nodeId: string | null, center = false, keyboard = false) =>
    updateMap({ nodeId }, center, keyboard);
  const focusNode = (nodeId: string, keyboard = false) => selectNode(nodeId, true, keyboard);
  const changeView = (view: UniversalMapView) =>
    updateMap({ view }, view === "full" && selectedNodeId !== lastFullSelection.current);

  // Selection derives from the committed URL: Back can cancel a concurrent
  // navigation before it renders. Only consume its camera intent if it commits.
  useEffect(() => {
    if (!mounted || handledLocationKey.current === location.key) return;
    handledLocationKey.current = location.key;
    const local =
      navigationType !== "POP" && pendingSelection.current?.hash === location.hash
        ? pendingSelection.current
        : undefined;
    pendingSelection.current = undefined;
    const nodeId = universalMapNodeFromHash(location.hash, UNIVERSAL_NODE_IDS);
    const nodeChanged = committedNode.current !== nodeId;
    committedNode.current = nodeId;
    focusDetails.current = local?.keyboard ?? false;
    if (nodeId && (local ? local.center : nodeChanged)) requestNodeFocus(nodeId);
    else {
      setFocusRequest(undefined);
      if (!local && nodeChanged && !nodeId) setViewResetRequest((previous) => previous + 1);
    }
  }, [mounted, location.hash, location.key, navigationType, requestNodeFocus]);
  useEffect(() => {
    if (!focusDetails.current) return;
    detailsHeadingRef.current?.focus({ preventScroll: true });
    focusDetails.current = false;
  }, [selectedNodeId, focusRequest]);
  const selectedNode = useMemo(
    () => UNIVERSAL_GRAPH.nodes.find((node) => node.id === selectedNodeId),
    [selectedNodeId],
  );
  const canonicalURL = canonicalPageUrl("/relationships/universal");
  const seoDescription = `Explore the complete ${SITE_NAME} patent network, including every represented inventor, assignee, source patent, and sourced corporate lineage connection.`;

  return (
    <StaticPageShell
      maxWidth={1600}
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Relationship map", to: "/relationships" },
        { label: "Universal map" },
      ]}
      seo={
        <SEOHead
          title={`Universal Patent Relationship Map — ${SITE_NAME}`}
          description={seoDescription}
          canonicalURL={canonicalURL}
          jsonLd={[
            collectionPageJsonLd({
              name: "Universal Patent Relationship Map",
              description: seoDescription,
              url: canonicalURL,
              route: "/relationships/universal",
            }),
            breadcrumbJsonLd([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Relationship map", url: canonicalPageUrl("/relationships") },
              { name: "Universal map", url: canonicalURL },
            ]),
          ]}
        />
      }
    >
      {({ theme: t }) => (
        <>
          <h1 style={H1_STYLE}>Universal Relationship Map</h1>
          <p style={{ color: t.muted, fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 0.6rem" }}>
            {ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS
              ? "Explore neighborhoods, inspect the complete map, or trace the evidence connecting two entities."
              : "Inspect the complete network of patents, inventors, assignees, and corporate relationships."}
          </p>

          <div
            style={{
              ...mapRow,
              gap: "0.4rem 1rem",
              marginBottom: "0.6rem",
            }}
          >
            {[
              [UNIVERSAL_GRAPH.stats.patents, "patents"],
              [UNIVERSAL_GRAPH.stats.lenses, "non-patent models"],
              [UNIVERSAL_GRAPH.stats.authors, "inventors"],
              [UNIVERSAL_GRAPH.stats.assignees, "assignees"],
              [UNIVERSAL_GRAPH.stats.corporateRelationships, "corporate links"],
              [UNIVERSAL_GRAPH.stats.components, "connected networks"],
            ].map(([value, label]) => (
              <div key={label} style={{ fontSize: "0.72rem" }}>
                <strong style={{ color: t.title }}>{value}</strong> <span style={{ color: t.muted }}>{label}</span>
              </div>
            ))}
          </div>

          <details style={{ color: t.muted, fontSize: "0.75rem", lineHeight: 1.6, marginBottom: 12 }}>
            <summary style={{ cursor: "pointer", minHeight: 30 }}>About the map and its evidence</summary>
            <p>
              Patents connect their named inventors and assignees. Dated corporate records describe succession,
              acquisition, subsidiaries, and corporate families. Shared inventors and spatial proximity do not establish
              ownership. Non-patent models connect to their explicit catalog maker. Neighborhood placement prioritizes
              corporate connections, then patent links. The full map retains every entity.
              {ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS &&
                " Explore summarizes these records; Research explains each connection with its available sources."}
            </p>
          </details>

          <ClientOnly
            fallback={
              <div style={{ ...panelCard(t), padding: "2rem", color: t.muted, textAlign: "center" }}>
                Preparing the universal relationship map…
              </div>
            }
          >
            <PanelErrorBoundary lensKey="universal-relationship-map">
              <UniversalMapSearch graph={UNIVERSAL_GRAPH} theme={t} onSelectNode={focusNode} />
              {ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS && (
                <div role="tablist" aria-label="Relationship map views" style={{ ...mapRow, marginBottom: 10 }}>
                  {MAP_VIEWS.map((tab, index) => (
                    <button
                      key={tab.id}
                      id={`map-tab-${tab.id}`}
                      role="tab"
                      aria-selected={view === tab.id}
                      aria-controls={`map-panel-${tab.id}`}
                      tabIndex={view === tab.id ? 0 : -1}
                      style={mapButton(t, view === tab.id)}
                      onClick={() => changeView(tab.id)}
                      onKeyDown={(event) => {
                        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                        event.preventDefault();
                        const next =
                          MAP_VIEWS[
                            event.key === "Home"
                              ? 0
                              : event.key === "End"
                                ? 2
                                : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3
                          ];
                        changeView(next.id);
                        document.getElementById(`map-tab-${next.id}`)?.focus();
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
              <fieldset style={{ ...mapRow, border: 0, padding: 0, margin: "0 0 14px" }}>
                <legend style={{ color: t.label, fontSize: "0.72rem", marginBottom: 6 }}>Relationship filters</legend>
                {UNIVERSAL_RELATION_GROUPS.map((group) => (
                  <label
                    key={group.label}
                    style={{
                      ...mapRow,
                      minHeight: 44,
                      fontSize: "0.75rem",
                      color: t.label,
                      padding: "0 8px",
                      border: `1px solid ${t.panelBorder}`,
                      borderRadius: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      ref={(input) => {
                        if (input)
                          input.indeterminate =
                            group.kinds.some((kind) => mapState.edgeKinds.includes(kind)) &&
                            !group.kinds.every((kind) => mapState.edgeKinds.includes(kind));
                      }}
                      checked={group.kinds.every((kind) => mapState.edgeKinds.includes(kind))}
                      onChange={(event) =>
                        updateMap({
                          edgeKinds: event.target.checked
                            ? [...new Set([...mapState.edgeKinds, ...group.kinds])]
                            : mapState.edgeKinds.filter((kind) => !group.kinds.includes(kind)),
                        })
                      }
                    />
                    {group.label}
                  </label>
                ))}
              </fieldset>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: sideDetails && selectedNode ? "minmax(0, 1fr) 320px" : "minmax(0, 1fr)",
                  gap: 18,
                  alignItems: "start",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  {ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS && (
                    <div
                      id="map-panel-explore"
                      role="tabpanel"
                      aria-labelledby="map-tab-explore"
                      hidden={view !== "explore"}
                    >
                      <UniversalMapExplore
                        graph={UNIVERSAL_GRAPH}
                        layout={UNIVERSAL_LAYOUT}
                        theme={t}
                        selectedNodeId={selectedNodeId}
                        neighborhoodId={
                          mapState.neighborhoodId ??
                          (selectedNodeId ? (UNIVERSAL_LAYOUT.nodeById[selectedNodeId]?.clusterId ?? null) : null)
                        }
                        edgeKinds={mapState.edgeKinds}
                        onSelectNode={focusNode}
                        onOpenNeighborhood={(neighborhoodId, nodeId) => updateMap({ neighborhoodId, nodeId }, true)}
                      />
                    </div>
                  )}
                  <div
                    id="map-panel-full"
                    role={ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS ? "tabpanel" : "region"}
                    aria-label={ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS ? undefined : "Full map"}
                    aria-labelledby={ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS ? "map-tab-full" : undefined}
                    hidden={view !== "full"}
                  >
                    <UniversalRelationshipMap
                      graph={UNIVERSAL_GRAPH}
                      layout={UNIVERSAL_LAYOUT}
                      edgeKinds={mapState.edgeKinds}
                      isVisible={view === "full"}
                      pathNodeIds={connectionPaths[0]?.nodeIds}
                      pathEdgeIds={connectionPaths[0]?.edgeIds}
                      theme={t}
                      selectedNodeId={selectedNodeId}
                      onSelectNode={(nodeId) => selectNode(nodeId)}
                      focusRequest={focusRequest}
                      viewResetRequest={viewResetRequest}
                    />
                  </div>
                  {ENABLE_UNIVERSAL_MAP_EXTRA_VIEWS && (
                    <div
                      id="map-panel-research"
                      role="tabpanel"
                      aria-labelledby="map-tab-research"
                      hidden={view !== "research"}
                    >
                      <UniversalMapResearch
                        graph={UNIVERSAL_GRAPH}
                        theme={t}
                        edgeKinds={mapState.edgeKinds}
                        selectedNodeId={selectedNodeId}
                        fromId={mapState.fromId}
                        toId={mapState.toId}
                        connectionPaths={connectionPaths}
                        onSelectNode={focusNode}
                        onFindPath={(fromId, toId) => updateMap({ fromId, toId })}
                      />
                    </div>
                  )}
                </div>
                {selectedNode && (
                  <details
                    key={selectedNodeId}
                    open
                    style={{
                      minWidth: 0,
                      position: sideDetails ? "sticky" : undefined,
                      top: sideDetails ? 60 : undefined,
                      maxHeight: sideDetails ? "calc(100vh - 80px)" : undefined,
                      overflowY: sideDetails ? "auto" : undefined,
                    }}
                  >
                    <summary style={{ color: t.label, fontSize: "0.8rem", cursor: "pointer", minHeight: 44 }}>
                      Selected entity details
                    </summary>
                    {selectedNode?.kind === "patent" && (
                      <PatentDetailCard
                        patent={selectedNode.patent}
                        theme={t}
                        onFocusParty={(ref, keyboard) => focusNode(`${ref.role}:${ref.slug}`, keyboard)}
                        onClose={() => selectNode(null)}
                        headingRef={detailsHeadingRef}
                      />
                    )}

                    {selectedNode && selectedNode.kind !== "patent" && (
                      <UniversalEntityDetailCard
                        graph={UNIVERSAL_GRAPH}
                        node={selectedNode}
                        theme={t}
                        onClose={() => selectNode(null)}
                        onSelectNode={focusNode}
                        headingRef={detailsHeadingRef}
                      />
                    )}
                  </details>
                )}
              </div>
            </PanelErrorBoundary>
          </ClientOnly>
        </>
      )}
    </StaticPageShell>
  );
}
